import { db } from './firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const tasksCollection = collection(db, "tasks");

export const addTask = async (task) => {
  try {
    await addDoc(tasksCollection, task);
  } catch (error) {
    console.error("Error adding task: ", error);
  }
};

export const updateTask = async (taskId, updates) => {
  const taskDoc = doc(db, "tasks", taskId);
  try {
    await updateDoc(taskDoc, updates);
  } catch (error) {
    console.error("Error updating task: ", error);
  }
};

export const deleteTask = async (taskId) => {
  const taskDoc = doc(db, "tasks", taskId);
  try {
    await deleteDoc(taskDoc);
  } catch (error) {
    console.error("Error deleting task: ", error);
  }
};
