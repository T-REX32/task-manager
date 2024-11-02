// src/app/taskService.ts
import { auth, tasksCollection } from '@/app/firebaseConfig';
import { query, where, getDocs } from "firebase/firestore";

// Definindo a interface para uma tarefa
export interface Task {
  id: string; // ID do documento
  title: string; // Título da tarefa
  description: string; // Descrição da tarefa
}

export const getTasks = async (): Promise<Task[]> => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be authenticated to fetch tasks.");

  const tasksQuery = query(tasksCollection, where("userId", "==", user.uid));
  const querySnapshot = await getDocs(tasksQuery);
  
  const tasks: Task[] = querySnapshot.docs.map(doc => ({
    id: doc.id,
    title: doc.data().title,
    description: doc.data().description
  }));
  
  return tasks;
};
