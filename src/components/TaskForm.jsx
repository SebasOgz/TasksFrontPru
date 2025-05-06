import { useForm } from "react-hook-form";
import { createTask } from "../services/TaskService";
import { useTasks } from "../context/TaskContext";

export const TaskForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { loadTasks } = useTasks();

  const onSubmit = async (data) => {
    await createTask({ ...data, status: "TODO" });
    reset();
    loadTasks();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Título" {...register("title")} />
      <input placeholder="Descripción" {...register("description")} />
      <input placeholder="Responsable" {...register("assignedTo")} />
      <input type="date" {...register("dueDate")} />
      {/* <input placeholder="Estado" {...register("status")} /> */}
      <button type="submit">Crear tarea</button>
    </form>
  );
};
