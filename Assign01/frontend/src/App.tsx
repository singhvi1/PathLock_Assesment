import { useEffect, useMemo, useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import type { TaskItem, Filter } from './types';
import { createTask, deleteTask, fetchTasks, updateTaskStatus } from './api';

const STORAGE_KEY = 'task-manager-tasks-v1';
const STORAGE_FILTER_KEY = 'task-manager-filter-v1';

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as TaskItem[] : [];
  });
  const [filter, setFilter] = useState<Filter>(() => {
    const raw = localStorage.getItem(STORAGE_FILTER_KEY);
    return (raw as Filter) || 'all';
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_FILTER_KEY, filter);
  }, [filter]);

  useEffect(() => {
    // initial sync from backend; if it fails, the app still works offline via localStorage
    (async () => {
      try {
        setLoading(true);
        const serverTasks = await fetchTasks();
        if (serverTasks && serverTasks.length >= 0) {
          setTasks(serverTasks);
        }
      } catch (e) {
        // ignore, remain with local state
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function add(description: string) {
    setError(null);
    const optimistic: TaskItem = {
      id: crypto.randomUUID(),
      description,
      isCompleted: false,
    };
    setTasks(prev => [optimistic, ...prev]);
    try {
      const created = await createTask(description);
      setTasks(prev => [created, ...prev.filter(t => t.id !== optimistic.id)]);
    } catch (e: any) {
      setTasks(prev => prev.filter(t => t.id !== optimistic.id));
      setError(e?.message ?? 'Failed to add task');
    }
  }

  async function toggle(id: string, isCompleted: boolean) {
    setError(null);
    const prev = tasks;
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted } : t));
    try {
      await updateTaskStatus(id, isCompleted);
    } catch (e: any) {
      setTasks(prev);
      setError(e?.message ?? 'Failed to update task');
    }
  }

  async function remove(id: string) {
    setError(null);
    const prev = tasks;
    setTasks(prev => prev.filter(t => t.id !== id));
    try {
      await deleteTask(id);
    } catch (e: any) {
      setTasks(prev);
      setError(e?.message ?? 'Failed to delete task');
    }
  }

  const remaining = useMemo(() => tasks.filter(t => !t.isCompleted).length, [tasks]);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Basic Task Manager</h1>

      <div className="card mb-4">
        <TaskInput onAdd={add} />
      </div>

      {error && (
        <div className="mb-3 rounded-md border border-red-300 bg-red-50 p-3 text-red-700">{error}</div>
      )}

      {loading ? (
        <div className="card">Loading...</div>
      ) : (
        <TaskList
          tasks={tasks}
          filter={filter}
          setFilter={setFilter}
          onToggle={toggle}
          onDelete={remove}
        />
      )}

      <div className="mt-3 text-sm text-gray-600">{remaining} remaining</div>
      <footer className="mt-8 text-center text-xs text-gray-500">
        Built with React + TypeScript + TailwindCSS
      </footer>
    </div>
  );
}



