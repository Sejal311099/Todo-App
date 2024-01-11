import "./App.css";
import TodoApp from "./container/TodoApp";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import TodoList from "./container/TodoList";

function App() {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App;
