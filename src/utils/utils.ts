export interface Categoria {
  id: number;
  nome: string;
}

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  situacao: string;
  data_limite: string;
  categoria: Categoria;
  categoria_id: string;
}
