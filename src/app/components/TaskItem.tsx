"use client";

import React from 'react';
import { Task } from '../../utils/tasks';

type TaskItemProps = {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void; 
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete, onEdit }) => {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <span className={`priority ${task.priority}`}>{task.priority}</span>
      </div>
      <button onClick={() => onToggleComplete(task.id)}>Toggle Complete</button>
      <button onClick={() => onEdit(task)}>Edit</button> 
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
