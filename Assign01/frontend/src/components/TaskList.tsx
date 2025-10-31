import TaskItem from './TaskItem';
import type { TaskItem as Task, Filter } from '../types';

type Props = {
  tasks: Task[];
  filter: Filter;
  setFilter: (f: Filter) => void;
  onToggle: (id: string, isCompleted: boolean) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({ tasks, filter, setFilter, onToggle, onDelete }: Props) {
  const filtered = tasks.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.isCompleted : t.isCompleted
  );

  return (
    <div className="card">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-sm text-gray-600">Filter:</span>
        <div className="flex gap-2">
          <button className={`btn ${filter==='all'?'btn-primary':'btn-outline'}`} onClick={() => setFilter('all')}>All</button>
          <button className={`btn ${filter==='active'?'btn-primary':'btn-outline'}`} onClick={() => setFilter('active')}>Active</button>
          <button className={`btn ${filter==='completed'?'btn-primary':'btn-outline'}`} onClick={() => setFilter('completed')}>Completed</button>
        </div>
      </div>
      <ul>
        {filtered.length === 0 && (
          <li className="text-gray-500">No tasks.</li>
        )}
        {filtered.map(t => (
          <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}



