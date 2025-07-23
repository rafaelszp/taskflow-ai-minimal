'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// UI Components
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAISuggestions } from '@/hooks/use-ai-suggestions';

// Form Components
import { Form } from '@/components/ui/form';
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form-field';

// Types
type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

type TaskFormValues = {
  title: string;
  description?: string;
  dueDate: Date | undefined;
  priority: Priority;
  status: Status;
};

const taskFormSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  dueDate: z.date({
    required_error: 'Por favor, selecione uma data de vencimento',
  }),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH'] as const, {
    required_error: 'Por favor, selecione uma prioridade',
  }),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE'] as const, {
    required_error: 'Por favor, selecione um status',
  }),
});

type TaskFormSchema = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  initialData?: Partial<TaskFormValues>;
  onSubmit: (data: TaskFormValues) => Promise<void>;
  onSuccess?: () => void;
}

export function TaskForm({ initialData, onSubmit, onSuccess }: TaskFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // Close any open dropdowns here if needed
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const router = useRouter();
  const { toast } = useToast();
  const { suggestPriority, isLoading: isAILoading } = useAISuggestions();

  const form = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      dueDate: initialData?.dueDate,
      priority: (initialData?.priority || 'MEDIUM') as Priority,
      status: (initialData?.status || 'TODO') as Status,
    },
  });

  const handleAISuggest = useCallback(async () => {
    const values = form.getValues();
    const { title, description } = values;

    if (!title && !description) {
      toast({
        title: 'Informações insuficientes',
        description: 'Por favor, preencha o título ou a descrição para obter sugestões de prioridade.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const priority = await suggestPriority(title, description);
      if (priority) {
        // Convert the priority to uppercase to match the expected type
        const formattedPriority = priority.toUpperCase() as Priority;
        form.setValue('priority', formattedPriority, { shouldValidate: true });
        toast({
          title: 'Prioridade sugerida com sucesso!',
          description: `A prioridade sugerida é: ${getPriorityLabel(formattedPriority)}`,
        });
      }
    } catch (error) {
      console.error('Error getting AI suggestion:', error);
      toast({
        title: 'Erro ao obter sugestão',
        description: 'Não foi possível obter uma sugestão de prioridade. Tente novamente mais tarde.',
        variant: 'destructive',
      });
    }
  }, [form, suggestPriority, toast]);

  const getPriorityLabel = (priority: Priority): string => {
    switch (priority) {
      case 'LOW':
        return 'Baixa';
      case 'MEDIUM':
        return 'Média';
      case 'HIGH':
        return 'Alta';
      default:
        return '';
    }
  };

  const handleSubmit = async (data: TaskFormSchema) => {
    try {
      await onSubmit(data);
      toast({
        title: 'Tarefa salva com sucesso!',
        description: 'Sua tarefa foi salva com sucesso.',
      });
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error saving task:', error);
      toast({
        title: 'Erro ao salvar tarefa',
        description: 'Ocorreu um erro ao salvar a tarefa. Por favor, tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6 relative min-h-screen bg-background p-4 md:p-6 border border-gray-200 rounded-lg" ref={containerRef}>
      <Form 
        form={form}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Title Field */}
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o título da tarefa"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrição da tarefa"
                  className="min-h-[100px] border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Due Date Field */}
            <FormField 
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de vencimento *</FormLabel>
                  <div className="w-full">
                    <div className="relative">
                      <DatePicker
                        selected={field.value ? new Date(field.value) : null}
                        onChange={(date: Date | null) => {
                          if (date) {
                            // Set time to start of day
                            date.setHours(0, 0, 0, 0);
                            field.onChange(date);
                          } else {
                            field.onChange(null);
                          }
                        }}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        minDate={new Date()}
                        dateFormat="PPP"
                        locale={ptBR}
                        showPopperArrow={false}
                        popperPlacement="bottom-start"
                        popperClassName="z-50"
                        customInput={
                          <div className="relative w-full">
                            <input
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              value={field.value ? format(field.value, 'PPP', { locale: ptBR }) : ''}
                              readOnly
                              placeholder="Selecione uma data"
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        }
                      />
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Priority Field */}
            <FormField
              name="priority"
              render={({ field }) => (
                <FormItem className="flex flex-col relative z-10">
                  <FormLabel>Prioridade *</FormLabel>
                  <div className="flex items-center gap-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="min-w-[180px] relative z-10">
                          <SelectValue placeholder="Selecione a prioridade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="min-w-[180px] rounded-md border bg-popover shadow-lg absolute z-[100] max-h-[var(--radix-select-content-available-height)] overflow-y-auto">
                        <SelectItem value="LOW" className="cursor-pointer hover:bg-accent">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            <span>Baixa</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="MEDIUM" className="cursor-pointer hover:bg-accent">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                            <span>Média</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="HIGH" className="cursor-pointer hover:bg-accent">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-red-500"></span>
                            <span>Alta</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAISuggest}
                      disabled={isAILoading}
                      title="Sugerir prioridade com IA"
                    >
                      <Sparkles className={`h-4 w-4 ${isAILoading ? 'animate-pulse' : ''}`} />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Status Field */}
          <FormField
            name="status"
            render={({ field }) => (
              <FormItem className="relative z-20">
                <FormLabel>Status *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="min-w-[180px] relative z-10">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="min-w-[180px] rounded-md border bg-popover shadow-lg absolute z-[100] max-h-[var(--radix-select-content-available-height)] overflow-y-auto">
                    <SelectItem value="TODO" className="cursor-pointer hover:bg-accent">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                        <span>A Fazer</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="IN_PROGRESS" className="cursor-pointer hover:bg-accent">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        <span>Em Progresso</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="DONE" className="cursor-pointer hover:bg-accent">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span>Concluído</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4 pt-4 pb-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Salvando...' : 'Salvar Tarefa'}
            </Button>
          </div>
      </Form>
    </div>
  );
}
