import { Task as PrismaTask } from '@prisma/client';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task extends Omit<PrismaTask, 'priority' | 'status'> {
  priority: TaskPriority;
  status: TaskStatus;
  isAISuggested?: boolean;
}

export interface TaskFormValues {
  title: string;
  description?: string;
  dueDate: Date | undefined;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => Promise<void>;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => Promise<void>;
}
