'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Check, Clock, AlertTriangle, Flag, MoreHorizontal, Pencil, Trash2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Task, TaskStatus } from '@/types/task';
import { useNotifications } from '@/contexts/NotificationContext';
import { TaskListProps } from '@/types/task';

export function TaskList({ tasks, onDelete, onStatusChange }: TaskListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);
  const { addNotification } = useNotifications();

  const statusIcons = {
    todo: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
    in_progress: <Clock className="h-4 w-4 text-blue-500" />,
    done: <Check className="h-4 w-4 text-green-500" />,
  };

  const statusLabels = {
    todo: 'A Fazer',
    in_progress: 'Em Andamento',
    done: 'Concluído',
  };

  const getPriorityColor = (priority: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (priority) {
      case 'HIGH':
        return 'text-red-600 dark:text-red-400';
      case 'MEDIUM':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'LOW':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getPriorityLabel = (priority: 'LOW' | 'MEDIUM' | 'HIGH') => {
    return priority === 'HIGH' ? 'Alta' : priority === 'MEDIUM' ? 'Média' : 'Baixa';
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    try {
      setUpdatingTaskId(taskId);
      await onStatusChange?.(taskId, newStatus);
      
      addNotification({
        type: 'success',
        title: 'Status atualizado',
        message: `Tarefa movida para "${statusLabels[newStatus]}"`,
      });
    } catch (error) {
      console.error('Error updating task status:', error);
      addNotification({
        type: 'error',
        title: 'Erro',
        message: 'Não foi possível atualizar o status da tarefa',
      });
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const formatDueDate = (date: Date | null) => {
    if (!date) return 'Sem data';
    
    const today = new Date();
    const taskDate = new Date(date);
    
    if (taskDate.toDateString() === today.toDateString()) {
      return `Hoje, ${format(taskDate, 'HH:mm')}`;
    }
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (taskDate.toDateString() === tomorrow.toDateString()) {
      return `Amanhã, ${format(taskDate, 'HH:mm')}`;
    }
    
    return format(taskDate, 'PPP', { locale: ptBR });
  };

  const handleDelete = async (taskId: string) => {
    try {
      setIsDeleting(taskId);
      await onDelete(taskId);
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    } finally {
      setIsDeleting(null);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Nenhuma tarefa encontrada.</p>
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          Comece criando sua primeira tarefa!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="flex items-start space-x-4">
            <div className="mt-1">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                {statusIcons[task.status]}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 dark:text-white truncate">{task.title}</h3>
              {task.description && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2 break-words">
                  {task.description}
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Flag className={`mr-1 h-3 w-3 ${getPriorityColor(task.priority)}`} />
                  <span className="capitalize">
                    {getPriorityLabel(task.priority)}
                    {task.isAISuggested && (
                      <span className="ml-1 rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        IA
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3 flex-shrink-0" />
                  <span className="whitespace-nowrap">{formatDueDate(task.dueDate)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  disabled={updatingTaskId === task.id}
                >
                  {statusIcons[task.status]}
                  <span className="hidden sm:inline">{statusLabels[task.status]}</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.entries(statusLabels).map(([status, label]) => (
                  <DropdownMenuItem
                    key={status}
                    className={`flex items-center gap-2 ${task.status === status ? 'bg-accent' : ''}`}
                    onClick={() => handleStatusChange(task.id, status as TaskStatus)}
                    disabled={updatingTaskId === task.id}
                  >
                    {statusIcons[status as TaskStatus]}
                    <span>{label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/tasks/${task.id}/edit`} className="cursor-pointer">
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Editar</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                  onClick={() => handleDelete(task.id)}
                  disabled={isDeleting === task.id}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>{isDeleting === task.id ? 'Excluindo...' : 'Excluir'}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
