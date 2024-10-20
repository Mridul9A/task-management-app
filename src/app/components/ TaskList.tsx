import { Task } from '../../utils/tasks';
import TaskItem from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void; 
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete, onEdit }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggleComplete={onToggleComplete} 
          onDelete={onDelete} 
          onEdit={onEdit} 
        />
      ))}
    </ul>
  );
};

export default TaskList;
