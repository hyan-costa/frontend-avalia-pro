
export enum AreaEspecializacao {
  DESENVOLVIMENTO_WEB = 'DESENVOLVIMENTO_WEB',
  INTELIGENCIA_ARTIFICIAL = 'INTELIGENCIA_ARTIFICIAL',
  MACHINE_LEARNING = 'MACHINE_LEARNING',
  BANCO_DE_DADOS = 'BANCO_DE_DADOS',
  SEGURANCA_DA_INFORMACAO = 'SEGURANCA_DA_INFORMACAO',
  SISTEMAS_DISTRIBUIDOS = 'SISTEMAS_DISTRIBUIDOS',
}

export interface Avaliador {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  dataNascimento: Date;
  genero: string;
  instituicao: string;
  areaAtuacao: string;
  areaEspecializacao: AreaEspecializacao;
  status: boolean;
  projeto?: any[]; // O ideal é ter um modelo de Projeto
}
