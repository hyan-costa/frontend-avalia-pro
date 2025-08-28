
import { Autor } from './autor.model';
import { Premio } from './premio.model';
import { Avaliador } from './avaliador.model';

export enum AreaTematica {
  EDUCACAO_CIENCIAS_HUMANAS = 'EDUCACAO_CIENCIAS_HUMANAS',
  MEIO_AMBIENTE = 'MEIO_AMBIENTE',
  CIENCIAS_EXATAS_E_TERRA = 'CIENCIAS_EXATAS_E_TERRA',
  INOVACAO_TECNOLOGIA = 'INOVACAO_TECNOLOGIA',
  SAUDE_BEM_ESTAR = 'SAUDE_BEM_ESTAR',
  ECONOMIA_EMPREENDEDORISMO = 'ECONOMIA_EMPREENDEDORISMO',
  ARTES_CULTURA = 'ARTES_CULTURA',
  DIREITOS_HUMANOS_CIDADANIA = 'DIREITOS_HUMANOS_CIDADANIA',
}

export enum SituacaoProjeto {
  SUBMETIDO = "Submetido",
  EM_AVALIACAO = "Em Avaliação",
  AVALIADO_APROVADO = "Avaliado - Aprovado",
  AVALIADO_REPROVADO = "Avaliado - Reprovado",
  PENDENTE_AJUSTES = "Pendente de Ajustes",
  CONCLUIDO = "Concluido",
  FINALIZADO = "Finalizado",
  CANCELADO = "Cancelado",
}

export interface Projeto {
  id: number;
  titulo: string;
  areaTematica: AreaTematica;
  resumo: string;
  dataCadastro: Date;
  status: boolean;
  situacao: SituacaoProjeto;
  nota?: number;
  parecerDescritivo?: string;
  autores: Autor[];
  premioId: number;
  premio: Premio;
  avaliadorId?: number;
  avaliador?: Avaliador;
}
