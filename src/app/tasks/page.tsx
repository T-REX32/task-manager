// src/app/tasks/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebaseConfig';
import { getTasks, addTask, updateTask, deleteTask, Task } from '@/app/taskService';

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push('/');
        return;
      }

      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (error) {
        setError("Erro ao buscar tarefas.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [router]);

  const handleAddTask = async () => {
    if (!newTaskTitle || !newTaskDescription) return;
    try {
      await addTask(newTaskTitle, newTaskDescription);
      setNewTaskTitle('');
      setNewTaskDescription('');
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
    } catch (error) {
      setError("Erro ao adicionar tarefa.");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      setError("Erro ao excluir tarefa.");
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      await updateTask(task.id, { completed: !task.completed });
      setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !task.completed } : t));
    } catch (error) {
      setError("Erro ao atualizar tarefa.");
    }
  };

  if (loading) return <div className="text-center mt-10 text-xl">Carregando tarefas...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Gerenciamento de Tarefas</h1>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Título da tarefa"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-full sm:w-1/3 focus:outline-none focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="Descrição da tarefa"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-full sm:w-1/3 focus:outline-none focus:border-indigo-500"
        />
        <button
          onClick={handleAddTask}
          className="bg-indigo-500 text-white px-5 py-3 rounded-lg hover:bg-indigo-600 w-full sm:w-auto"
        >
          Adicionar Tarefa
        </button>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma tarefa encontrada.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`p-5 border rounded-lg flex justify-between items-center ${
                task.completed ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-gray-700">{task.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleComplete(task)}
                  className={`px-4 py-2 rounded-lg text-white ${
                    task.completed ? "bg-yellow-500" : "bg-green-500"
                  } hover:opacity-90`}
                >
                  {task.completed ? "Incompleta" : "Completa"}
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksPage;
