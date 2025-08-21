
export interface Premio {
  id: number;
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  detalheCronograma: string;
  anoEdicao: number;
  status: boolean;
  projetos?: any[]; // O ideal é ter um modelo de Projeto
}
