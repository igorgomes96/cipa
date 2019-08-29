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
  nome: string;
  email: string;
  area: string;
  cargo: string;
  votos: number;
  foto: string;
  candidatoId: number;
  resultadoApuracao: Resultado;
}
