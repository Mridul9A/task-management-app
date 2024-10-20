import React, { useState, useEffect } from 'react';
import { Task } from '../../utils/tasks';

type TaskFormProps = {
  onAdd: (task: Task) => void;
  onEdit?: (task: Task) => void; 
  taskToEdit?: Task | null; 
};

const TaskForm: React.FC<TaskFormProps> = ({ onAdd, onEdit, taskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: taskToEdit ? taskToEdit.id : Date.now().toString(), 
      title,
      description,
      priority,
      completed: false,
    };

    if (taskToEdit) {
      if (onEdit) {
        onEdit(newTask); 
      }
    } else {
      onAdd(newTask); 
    }

    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
