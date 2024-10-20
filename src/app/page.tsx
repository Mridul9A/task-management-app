"use client"; 

import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/ TaskList';
import { Task } from '../utils/tasks';

const Page: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sortOrder, setSortOrder] = useState<'high' | 'medium' | 'low' | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/task'); 
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);


  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleEditTask = (editedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'high' | 'medium' | 'low' | 'all');
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTasks = filteredTasks.sort((a, b) => {
    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3,
    };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div>
      <h1>Task Management App</h1>
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <select value={sortOrder} onChange={handleSortChange}>
        <option value="all">All</option>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
      <TaskForm onAdd={handleAddTask} onEdit={undefined} />
      <TaskList 
        tasks={sortedTasks} 
        onToggleComplete={handleToggleComplete} 
        onDelete={handleDeleteTask} 
        onEdit={handleEditTask} 
      />
    </div>
  );
};

export default Page;
