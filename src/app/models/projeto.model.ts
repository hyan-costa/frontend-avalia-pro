
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
  SUBMETIDO = 'SUBMETIDO',
  EM_AVALIACAO = 'EM_AVALIACAO',
  AVALIADO_APROVADO = 'AVALIADO_APROVADO',
  AVALIADO_REPROVADO = 'AVALIADO_REPROVADO',
  PENDENTE_AJUSTES = 'PENDENTE_AJUSTES',
  CONCLUIDO = 'CONCLUIDO',
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
