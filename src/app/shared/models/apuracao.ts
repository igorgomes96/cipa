export enum Resultado {
  Efetivo = 'Efetivo',
  Suplente = 'Suplente',
  NaoEleito = 'Não eleito'
}

export class ResultadoApuracao {
  efetivos: Apuracao[];
  suplentes: Apuracao[];
  naoEleitos: Apuracao[];
}

export class Apuracao {
  eleicaoId: number;
  nome: string;
  email: string;
  matricula: string;
  cargo: string;
  area: string;
  votos: number;
  foto: string;
  dataAdmissao: Date;
  dataNascimento: Date;
  inscricaoId: number;
  resultadoApuracao: Resultado;
}
