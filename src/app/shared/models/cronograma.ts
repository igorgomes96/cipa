import { Arquivo } from './arquivo';

export enum PosicaoEtapa {
  Passada = 'Passada',
  Atual = 'Atual',
  Futura = 'Futura'
}

export enum CodigoEtapaObrigatoria {
  Convocacao = 1,
  FormacaoComissao = 2,
  EditalInscricao = 3,
  Inscricao = 4,
  Votacao = 5,
  Apuracao = 6,
  Ata = 7
}

export class EtapaBase {
  id: number;
  nome: string;
  descricao: string;
  ordem: number;
}

export class EtapaCronograma extends EtapaBase {
  eleicaoId: number;
  dataPrevista: Date;
  dataRealizada: Date;
  etapaObrigatoriaId: number;
  posicaoEtapa: PosicaoEtapa;
  templates: Arquivo[];
  possuiTemplates: boolean;
  etapaObrigatoria: EtapaObrigatoria;
  erroMudancaEtapa: string;
}

export class EtapaObrigatoria extends EtapaBase {
  duracaoMinima: number;
}

export class EtapaPadraoConta extends EtapaBase {
  contaId: number;
  etapaObrigatoriaId: number;
  duracaoPadrao: number;
}
