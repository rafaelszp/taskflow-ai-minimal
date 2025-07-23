'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskList } from '@/components/TaskList';
import { Task, TaskStatus } from '@/types/task';

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'in_progress' | 'done'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'all'>('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(tasks.filter((task) => task.id !== taskId));
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update the task in the local state
        setTasks(tasks.map(task => 
          task.id === taskId ? { ...task, status: newStatus } : task
        ));
      } else {
        throw new Error('Failed to update task status');
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error; // Re-throw to be handled by the TaskList component
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter === 'all' || task.status === statusFilter;
    const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Minhas Tarefas</h2>
          <p className="text-muted-foreground">
            Gerencie suas tarefas e mantenha-se produtivo
          </p>
        </div>
        <Button onClick={() => router.push('/tasks/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
          >
            Todas
          </Button>
          <Button
            variant={statusFilter === 'todo' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('todo')}
          >
            A Fazer
          </Button>
          <Button
            variant={statusFilter === 'in_progress' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('in_progress')}
          >
            Em Andamento
          </Button>
          <Button
            variant={statusFilter === 'done' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('done')}
          >
            Concluídas
          </Button>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Prioridade:</span>
          <Button
            variant={priorityFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPriorityFilter('all')}
          >
            Todas
          </Button>
          <Button
            variant={priorityFilter === 'HIGH' ? 'default' : 'outline'}
            size="sm"
            className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
            onClick={() => setPriorityFilter('HIGH')}
          >
            Alta
          </Button>
          <Button
            variant={priorityFilter === 'MEDIUM' ? 'default' : 'outline'}
            size="sm"
            className="text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
            onClick={() => setPriorityFilter('MEDIUM')}
          >
            Média
          </Button>
          <Button
            variant={priorityFilter === 'LOW' ? 'default' : 'outline'}
            size="sm"
            className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
            onClick={() => setPriorityFilter('LOW')}
          >
            Baixa
          </Button>
        </div>
      </div>

      <TaskList 
        tasks={filteredTasks} 
        onDelete={handleDeleteTask} 
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
