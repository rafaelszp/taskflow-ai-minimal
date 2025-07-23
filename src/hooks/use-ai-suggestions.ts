'use client';

import { useState } from 'react';
import { useToast } from './use-toast';

type TaskPriority = 'low' | 'medium' | 'high';

export function useAISuggestions() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const suggestPriority = async (title: string, description?: string, dueDate?: Date) => {
    if (!title.trim()) return null;

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ai/suggest-priority', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          dueDate: dueDate?.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI suggestion');
      }

      const data = await response.json();
      return data.priority as TaskPriority;
    } catch (error) {
      console.error('Error getting AI suggestion:', error);
      toast({
        title: 'Error',
        description: 'Failed to get AI priority suggestion',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    suggestPriority,
    isLoading,
  };
}
