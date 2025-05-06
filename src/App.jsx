import { Home } from "./pages/Home";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <Home />
    </TaskProvider>
  );
}

export default App;
