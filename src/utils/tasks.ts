export type Task = {
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    completed: boolean;
};

export const initialTasks: Task[] = [
    { id: '1', title: 'Task 1', description: 'Description for Task 1', priority: 'high', completed: false },
    { id: '2', title: 'Task 2', description: 'Description for Task 2', priority: 'medium', completed: false },
    { id: '3', title: 'Task 3', description: 'Description for Task 3', priority: 'low', completed: false },
];
