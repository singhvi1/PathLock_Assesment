import type { TaskItem as Task } from '../types';

type Props = {
  task: Task;
  onToggle: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center gap-3 py-2">
      <input
        id={`task-${task.id}`}
        type="checkbox"
        checked={task.isCompleted}
        onChange={(e) => onToggle(task.id, e.target.checked)}
        className="h-4 w-4"
      />
      <label
        htmlFor={`task-${task.id}`}
        className={"flex-1 " + (task.isCompleted ? 'line-through text-gray-400' : '')}
      >
        {task.description}
      </label>
      <button className="btn btn-outline" onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}



