import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Funções usando `fetch`
const API_URL = "http://localhost:8000/api";

export const getTarefasFetch = async () => {
  const response = await fetch(`${API_URL}/tarefas`);
  if (!response.ok) {
    throw new Error("Erro ao buscar tarefas");
  }
  return response.json();
};

export const createTarefaFetch = async (data: any) => {
  const response = await fetch(`${API_URL}/tarefas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Erro ao criar tarefa");
  }
  return response.json();
};

export const updateTarefaFetch = async (id: any, data: any) => {
  const response = await fetch(`${API_URL}/tarefas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar tarefa");
  }
  return response.json();
};

export const deleteTarefaFetch = async (id: any) => {
  const response = await fetch(`${API_URL}/tarefas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Erro ao deletar tarefa");
  }
};

// Exportando a instância do Axios também
export default api;
