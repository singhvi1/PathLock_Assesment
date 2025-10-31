import axios from 'axios';
import type { TaskItem } from './types';

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:5000';

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
});

export async function fetchTasks(): Promise<TaskItem[]> {
  const { data } = await api.get<TaskItem[]>('/tasks');
  return data;
}

export async function createTask(description: string): Promise<TaskItem> {
  const { data } = await api.post<TaskItem>('/tasks', { description });
  return data;
}

export async function updateTaskStatus(id: string, isCompleted: boolean): Promise<TaskItem> {
  const { data } = await api.put<TaskItem>(`/tasks/${id}`, { isCompleted });
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}



