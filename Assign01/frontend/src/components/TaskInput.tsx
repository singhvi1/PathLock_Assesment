import { useState } from 'react';

type Props = {
  onAdd: (description: string) => void;
};

export default function TaskInput({ onAdd }: Props) {
  const [value, setValue] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="text"
        className="flex-1 rounded-md border border-gray-300 px-3 py-2"
        placeholder="Add a new task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">Add</button>
    </form>
  );
}



