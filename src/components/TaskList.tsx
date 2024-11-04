import React, { useEffect, useState } from "react";
import api, { getTarefasFetch, deleteTarefaFetch } from "../services/api";
import { Tarefa } from "../utils/utils";
import "./TaskList.scss";
import EditTask from "./PopupEditTask/EditTask";

interface Props {
  onEdit: (tarefa: Tarefa | null) => void;
  refresh: boolean;
}

const TaskList: React.FC<Props> = ({ onEdit, refresh }) => {
  const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [selectedTask, setSelectedTask] = useState<Tarefa | null>(null);

  useEffect(() => {
    fetchTarefas();
  }, [refresh]);

  const fetchTarefas = async () => {
    api
      .get("/tarefas")
      .then((response) => setTarefas(response.data))
      .catch((error) => console.error("Erro ao buscar tarefaaaaas:", error));
  };

  const openPopup = (task: Tarefa, type: string) => {
    setSelectedTask(task);
    if (type === "edit") {
      setIsPopupEditOpen(true);
    } else {
      setIsPopupDeleteOpen(true);
    }
  };

  const closePopup = () => {
    setSelectedTask(null);
    setIsPopupEditOpen(false);
    setIsPopupDeleteOpen(false);
  };

  const updateTask = async (user: Tarefa) => {
    try {
      const response = await api.post(`/updateUser`, user);
      api.get("/tarefas").then((response) => {
        if (response.data.status === "Ok") {
          closePopup();
        }
      });
    } catch (error) {
      console.error(error);
      alert(
        "Ops... Algo deu errado ao efetuar a alteração da tarefa. Tente novamente"
      );
    }
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <table id="tableTasks">
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoria</th>
            <th>Situação</th>
            <th>Data Limite</th>
            <th>Data Limite</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.id}>
              <td>{tarefa.titulo}</td> <td>{tarefa.categoria.nome}</td>{" "}
              <td>{tarefa.situacao}</td>{" "}
              <td>{new Date(tarefa.data_limite).toLocaleString()}</td>{" "}
              <td>
                {/* <button onClick={() => onEdit(tarefa)}>Editar</button> */}
                <button onClick={() => openPopup(tarefa, "edit")}>
                  Editar
                </button>
                <button
                  onClick={() => {
                    api
                      .delete(`/tarefas/${tarefa.id}`)
                      .then(() => fetchTarefas())
                      .catch((error) =>
                        console.error("Erro ao deletar tarefa:", error)
                      );
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupEditOpen && selectedTask && (
        <EditTask
          task={selectedTask}
          onSave={updateTask}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default TaskList;
