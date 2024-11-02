// src/app/tasks/page.tsx
"use client";
import taskService from '@/app/taskService';
import { useEffect, useState } from 'react';
import { auth } from '@/app/firebaseConfig'; 
import { useRouter } from 'next/navigation';
import { getTasks } from '@/app/taskService'; // Supondo que você tenha essa função para buscar tarefas

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter(); // Inicializa o router

  useEffect(() => {
    const fetchTasks = async () => {
      const user = auth.currentUser;

      if (!user) {
        // Redireciona para a página de login se o usuário não estiver autenticado
        router.push('/');
        return;
      }

      try {
        const tasksData = await getTasks(); // Chame a função para buscar as tarefas
        console.log("Tasks fetched:", tasksData); // Debug: Mostra as tarefas retornadas
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Erro ao buscar tarefas.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [router]); // Adicione `router` como dependência

  if (loading) {
    return <div>Carregando tarefas...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Tarefas</h1>
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default TasksPage;
