'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { TaskForm } from '@/components/TaskForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const [task, setTask] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/tasks/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setTask({
            ...data,
            dueDate: data.dueDate ? new Date(data.dueDate) : null,
          });
        } else {
          throw new Error('Tarefa não encontrada');
        }
      } catch (error) {
        console.error('Erro ao carregar tarefa:', error);
        router.push('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchTask();
    }
  }, [params.id, router]);

  const handleSubmit = async (data: {
    title: string;
    description?: string;
    dueDate: Date | undefined;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  }) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          dueDate: data.dueDate?.toISOString(),
        }),
      });

      if (response.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao atualizar tarefa');
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      alert('Erro ao atualizar tarefa. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Tarefa não encontrada</p>
        <Button onClick={() => router.push('/dashboard')} className="mt-4">
          Voltar para o painel
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Editar Tarefa</h2>
          <p className="text-muted-foreground">
            Atualize os detalhes da tarefa
          </p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <TaskForm initialData={task} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
