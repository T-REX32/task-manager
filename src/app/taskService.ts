// src/app/taskService.ts
import { auth, tasksCollection } from '@/app/firebaseConfig';
import { query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Definindo a interface para uma tarefa
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean; // Adicionando a propriedade 'completed'
  activities?: string[]; // Campo opcional para atividades adicionais
}

// Função para obter as tarefas do Firestore
export const getTasks = async (): Promise<Task[]> => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be authenticated to fetch tasks.");

  const tasksQuery = query(tasksCollection, where("userId", "==", user.uid));
  const querySnapshot = await getDocs(tasksQuery);
  
  const tasks: Task[] = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as Omit<Task, 'id'> // Desestrutura os dados como Task sem o 'id'
  }));
  
  return tasks;
};

// Função para adicionar uma nova tarefa
export const addTask = async (title: string, description: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be authenticated to add tasks.");

  const newTask = {
    userId: user.uid,
    title,
    description,
    completed: false,
    activities: []
  };

  await addDoc(tasksCollection, newTask);
};

// Função para atualizar uma tarefa existente
export const updateTask = async (taskId: string, updates: Partial<Task>) => {
  const taskRef = doc(tasksCollection, taskId);
  await updateDoc(taskRef, updates);
};

// Função para excluir uma tarefa
export const deleteTask = async (taskId: string) => {
  const taskRef = doc(tasksCollection, taskId);
  await deleteDoc(taskRef);
};
