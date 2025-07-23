const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

type TaskData = {
  title: string;
  description?: string | null;
  dueDate?: Date | null;
};

export async function suggestTaskPriority(task: TaskData): Promise<TaskPriority> {
  const prompt = `Given the following task, suggest the most appropriate priority level (LOW, MEDIUM, or HIGH) based on the title, description, and due date.

Task Title: ${task.title}
${task.description ? `Description: ${task.description}\n` : ''}${task.dueDate ? `Due Date: ${new Date(task.dueDate).toLocaleDateString()}` : ''}

Consider the following factors:
- Time sensitivity (due date proximity)
- Perceived importance based on task content
- Common task management practices

Respond with ONLY the priority level in UPPERCASE.`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that suggests task priorities based on task information.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 10,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const priority = data.choices[0]?.message?.content?.trim().toUpperCase();

    // Validate the response is a valid priority
    if (['LOW', 'MEDIUM', 'HIGH'].includes(priority)) {
      return priority as TaskPriority;
    }

    // Default to MEDIUM if the response is not a valid priority
    return 'MEDIUM';
  } catch (error) {
    console.error('Error getting AI suggestion:', error);
    // Default to MEDIUM if there's an error
    return 'MEDIUM';
  }
}
