// src/app/tasks/[id]/page.tsx
"use client"; // Adicione isso no topo do arquivo

import { useRouter } from 'next/router'; // Correto para Next.js 12 e versões anteriores
import { useEffect, useState } from 'react';
import { db } from '@/app/firebaseConfig'; // Certifique-se de que o caminho está correto
import { doc, getDoc } from 'firebase/firestore';

// Defina o tipo da tarefa
interface Task {
  id: string; // ID da tarefa
  title: string; // Título da tarefa
  description: string; // Descrição da tarefa
  completed: boolean; // Estado de conclusão da tarefa
  createdAt: Date; // Data de criação da tarefa
  // Adicione outras propriedades da tarefa aqui, se necessário
}

const TaskPage = () => {
  const router = useRouter();
  const { id } = router.query; // Obtenha o ID da URL usando router.params
  const [task, setTask] = useState<Task | null>(null); // Estado para armazenar a tarefa
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    const fetchTask = async () => {
      if (id) {
        const taskDoc = doc(db, 'tasks', id as string); // Altere 'tasks' para o nome da sua coleção no Firestore
        const taskSnapshot = await getDoc(taskDoc);
        
        if (taskSnapshot.exists()) {
          const taskData = taskSnapshot.data() as Task; // Force o tipo para Task
          setTask({ ...taskData, id: taskSnapshot.id }); // Defina os dados da tarefa no estado, incluindo o ID
        } else {
          console.log('Tarefa não encontrada');
        }
        setLoading(false); // Carregamento concluído
      }
    };

    fetchTask();
  }, [id]); // Dependência do ID para atualizar a tarefa quando mudar

  if (loading) {
    return <div>Carregando...</div>; // Mostre uma mensagem de carregamento
  }

  return (
    <div>
      <h1>Detalhes da Tarefa</h1>
      {task ? ( // Verifica se task não é null
        <>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.completed ? "Concluída" : "Pendente"}</p>
          <p>Criada em: {task.createdAt.toLocaleString()}</p>
        </>
      ) : (
        <p>Tarefa não encontrada</p>
      )}
    </div>
  );
};

export default TaskPage;
