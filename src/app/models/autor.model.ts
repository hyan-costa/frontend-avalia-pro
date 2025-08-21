
export interface Autor {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  instituicao: string;
  status: boolean;
  projetos?: any[]; // O ideal é ter um modelo de Projeto
}
