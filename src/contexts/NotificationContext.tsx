'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useSession } from 'next-auth/react';

type Notification = {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  taskId?: string;
};

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  checkDeadlines: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { data: session } = useSession();
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [{ ...notification, id }, ...prev]);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const checkDeadlines = async () => {
    if (!session?.user?.email) return;
    
    try {
      const response = await fetch('/api/tasks/upcoming-deadlines');
      if (!response.ok) throw new Error('Failed to fetch upcoming deadlines');
      
      const tasks = await response.json();
      const now = new Date();
      
      tasks.forEach((task: any) => {
        const dueDate = new Date(task.dueDate);
        const timeUntilDue = dueDate.getTime() - now.getTime();
        const hoursUntilDue = timeUntilDue / (1000 * 60 * 60);
        
        if (hoursUntilDue <= 24) {
          const timeLeft = formatDistanceToNow(dueDate, { 
            addSuffix: true, 
            locale: ptBR 
          });
          
          addNotification({
            type: 'warning',
            title: 'Prazo próximo',
            message: `"${task.title}" vence ${timeLeft}`,
            taskId: task.id,
          });
        }
      });
      
      setLastChecked(new Date());
    } catch (error) {
      console.error('Error checking deadlines:', error);
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível verificar os prazos das tarefas',
      });
    }
  };

  // Check for upcoming deadlines every 5 minutes
  useEffect(() => {
    if (!session?.user?.email) return;
    
    const interval = setInterval(() => {
      checkDeadlines();
    }, 5 * 60 * 1000); // 5 minutes
    
    // Initial check
    checkDeadlines();
    
    return () => clearInterval(interval);
  }, [session?.user?.email]);

  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        addNotification, 
        removeNotification,
        checkDeadlines,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
