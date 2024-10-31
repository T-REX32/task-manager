// src/app/dashboard.tsx
"use client";

import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), title: newTask, completed: false },
      ]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Add new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-200"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map(task => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-2 border rounded ${task.completed ? 'bg-green-100' : 'bg-gray-100'}`}
            >
              <span
                onClick={() => toggleTaskCompletion(task.id)}
                className={`flex-grow cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
              >
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
