import React, { useState } from "react";
// import { UpdateUser, User } from "../../../../utils/user";
import Popup from "../popup/popup";
import { Tarefa } from "../../utils/utils";

import "./EditTask.scss";

interface EditTaskProps {
  task: Tarefa;
  onClose: () => void;
  onSave: (updatedUser: Tarefa) => void;
}
const EditTask: React.FC<EditTaskProps> = ({ task, onClose, onSave }) => {
  const [divDadosActive, setDivDadosActive] = useState(true);
  const [divSenhaActive, setDivSenhaActive] = useState(false);

  const idTask = task.id;
  const [titulo, setTitulo] = useState(task.titulo);
  const [descricao, setDescricao] = useState(task.descricao);
  const [situacao, setSituacao] = useState(task.situacao);
  const [dataLimite, setDataLimite] = useState(task.data_limite);
  const [categoria, setCategoria] = useState(task.categoria);
  const [categoriaId, setCategoriaId] = useState(task.categoria_id);

  const handleActiveDivDados = () => {
    setDivSenhaActive(false);
    setDivDadosActive(true);
  };
  const handleActiveDivSenha = () => {
    setDivDadosActive(false);
    setDivSenhaActive(true);
  };

  const handleSave = async () => {
    const _task: Tarefa = {
      id: idTask,
      titulo,
      descricao,
      situacao,
      data_limite: dataLimite,
      categoria: categoria,
      categoria_id: categoriaId,
    };
    onSave(_task);
  };

  const renderHtmlPopup = () => {
    return (
      <>
        <h2>Editar usuário</h2>
        <div className="div-btns-select">
          <form>
            <div>
              <label>Título</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
                minLength={5}
              />
            </div>
            <div>
              <label>Descrição</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
            <div>
              <label>Data Limite</label>
              <input
                type="datetime-local"
                value={dataLimite}
                onChange={(e) => setDataLimite(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Situação</label>
              <select
                value={situacao}
                onChange={(e) => setSituacao(e.target.value)}
                required
              >
                <option value="Pendente">Pendente</option>
                <option value="Em progresso">Em progresso</option>
                <option value="Finalizada">Finalizada</option>
              </select>
            </div>
            <div>
              <label>Categoria</label>
              <input
                type="text"
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                required
              />
            </div>
            <button type="button" onClick={() => handleSave()}>
              Adicionar Tarefa
            </button>
            <button type="button" onClick={() => onClose()}>
              Fechar
            </button>
          </form>
        </div>
      </>
    );
  };

  return <Popup renderContent={renderHtmlPopup} />;
};

export default EditTask;
