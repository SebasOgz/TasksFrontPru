import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks } from "../context/TaskContext";
import { updateTask } from "../services/taskService";

const statuses = ["POR_HACER", "EN_PROGRESO", "FINALIZADA"];

export const KanbanBoard = () => {
  const { tasks, setTasks } = useTasks();

  const groupedTasks = statuses.reduce((acc, status) => {
    acc[status] = tasks ? tasks.filter((task) => task.status === status) : [];
    return acc;
  }, {});

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    const draggedTask = tasks.find((t) => t.id.toString() === draggableId);
    const updatedTask = { ...draggedTask, status: destination.droppableId };

    await updateTask(draggedTask.id, updatedTask);

    const updatedTasks = tasks.map((t) =>
      t.id === draggedTask.id ? updatedTask : t
    );

    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: "1rem" }}>
        {statuses.map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  border: "1px solid black",
                  width: "300px",
                  minHeight: "400px",
                  padding: "1rem",
                  background: "gray",
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                <h3>{status.replace("_", " ")}</h3>
                {groupedTasks[status].map((task, index) => (
                  <Draggable
                    key={task.id.toString()}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: "10px",
                          border: "1px solid gray",
                          marginBottom: "10px",
                          backgroundColor: "blue",
                          borderRadius: "4px",
                          overflowY: "auto",
                          ...provided.draggableProps.style,
                        }}
                      >
                        <strong>{task.title}</strong>
                        <p>Asignado A: {task.assignedTo}</p>
                        <p>Descripción: {task.description}</p>
                        <p>Fecha Vencimiento: {task.dueDate}</p>
                          {console.log(task)}
                    </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
