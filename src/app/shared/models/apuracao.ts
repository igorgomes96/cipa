export class ResultadoApuracao {
  efetivos: Apuracao[];
  suplentes: Apuracao[];
}

export class Apuracao {
  nome: string;
  email: string;
  area: string;
  cargo: string;
  votos: number;
  foto: string;
  candidatoId: number;
}
