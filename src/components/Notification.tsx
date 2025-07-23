'use client';

import { X } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';

type NotificationProps = {
  notification: {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message: string;
    taskId?: string;
  };
};

const typeStyles = {
  success: 'bg-green-100 border-green-400 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-200',
  error: 'bg-red-100 border-red-400 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-200',
  info: 'bg-blue-100 border-blue-400 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-200',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-800 dark:text-yellow-200',
};

export function Notification({ notification }: NotificationProps) {
  const { removeNotification } = useNotifications();
  const { id, type, title, message, taskId } = notification;

  return (
    <div 
      className={`relative flex flex-col p-4 mb-2 rounded-lg border ${typeStyles[type]} shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-right-8`}
      role="alert"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-current hover:bg-transparent hover:opacity-70"
          onClick={() => removeNotification(id)}
          aria-label="Fechar notificação"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm mt-1">{message}</p>
      {taskId && (
        <Button
          variant="link"
          className="h-auto p-0 mt-2 text-xs text-current hover:no-underline"
          onClick={() => {
            // Navigate to task detail or edit page
            window.location.href = `/tasks/${taskId}/edit`;
          }}
        >
          Ver tarefa →
        </Button>
      )}
    </div>
  );
}

export function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-xs space-y-2">
      {notifications.map((notification) => (
        <Notification 
          key={notification.id} 
          notification={notification} 
        />
      ))}
    </div>
  );
}
