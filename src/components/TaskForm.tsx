import React, { useEffect, useState } from "react";
import api from "../services/api";

interface Props {
  tarefa?: {
    id: number;
    titulo: string;
    descricao: string;
    situacao: string;
    data_limite: string;
    categoria_id: string;
  };
  onSave: () => void;
}

const TaskForm: React.FC<Props> = ({ tarefa, onSave }) => {
  const [titulo, setTitulo] = useState(tarefa ? tarefa.titulo : "");
  const [descricao, setDescricao] = useState(tarefa ? tarefa.descricao : "");
  const [dataLimite, setDataLimite] = useState(
    tarefa ? tarefa.data_limite : ""
  );
  const [situacao, setSituacao] = useState(
    tarefa ? tarefa.situacao : "Pendente"
  );
  const [categoriaId, setCategoriaId] = useState(
    tarefa ? tarefa.categoria_id : ""
  );

  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo);
      setDescricao(tarefa.descricao);
      setDataLimite(tarefa.data_limite);
      setSituacao(tarefa.situacao);
      setCategoriaId(tarefa.categoria_id);
    }
  }, [tarefa]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      titulo,
      descricao,
      situacao,
      data_limite: dataLimite,
      categoria_id: categoriaId,
    };
    try {
      if (tarefa && tarefa.id !== 0) {
        await api.put(`/tarefas/${tarefa.id}`, data);
      } else {
        await api.post("/tarefas", data);
      }
      onSave();
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
};

export default TaskForm;
