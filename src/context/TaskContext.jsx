import { createContext, useContext, useEffect, useState } from "react";
import { getTasks, createTask, updateTask } from "../services/TaskService";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res);  // Aquí se guarda directamente la lista de tareas.
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  const handleCreate = async (taskData) => {
    const res = await createTask(taskData);
    setTasks([...tasks, res]);
  };

  const handleUpdate = async (id, updatedData) => {
    const res = await updateTask(id, updatedData);
    setTasks(tasks.map((t) => (t.id === id ? res : t)));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, createTask: handleCreate, updateTask: handleUpdate }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
