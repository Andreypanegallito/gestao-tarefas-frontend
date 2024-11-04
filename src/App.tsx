import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Tarefa } from "./utils/utils";

const App: React.FC = () => {
  const [editingTask, setEditingTask] = useState<Tarefa | null>(null);
  const [refresh, setRefresh] = useState(false);

  const handleSave = () => {
    setEditingTask(null);
    setRefresh(!refresh);
  };
  return (
    <div className="App">
      <button
        onClick={() =>
          setEditingTask({
            id: 0,
            titulo: "",
            descricao: "",
            situacao: "Pendente",
            data_limite: "",
            categoria: { id: 0, nome: "" },
            categoria_id: "",
          })
        }
      >
        Nova Tarefa
      </button>
      {editingTask !== null && (
        <TaskForm tarefa={editingTask} onSave={handleSave} />
      )}
      <TaskList onEdit={setEditingTask} refresh={refresh} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
