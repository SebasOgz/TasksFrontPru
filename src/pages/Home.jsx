import { TaskForm } from "../components/TaskForm";
import { KanbanBoard } from "../components/KanbanBoard";

export const Home = () => {
  return (
    <div>
      <h1>Gestión de Tareas</h1>
      <TaskForm />
      <KanbanBoard />
    </div>
  );
};
