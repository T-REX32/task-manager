// src/app/taskService.ts
import { auth, tasksCollection } from '@/app/firebaseConfig';
import { query, where, getDocs } from "firebase/firestore";

export const getTasks = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be authenticated to fetch tasks.");

  const tasksQuery = query(tasksCollection, where("userId", "==", user.uid));
  const querySnapshot = await getDocs(tasksQuery);
  
  const tasks = querySnapshot.docs.map(doc => ({
    id: doc.id, // O ID do documento
    title: doc.data().title, // O título da tarefa
    description: doc.data().description // A descrição da tarefa
  }));
  
  return tasks;
};
