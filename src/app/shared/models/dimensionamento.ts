export class Dimensionamento {
    // grupoId: number;
    // codigoGrupo: string;
    minimo: number;
    maximo: number;
    qtdaEfetivos: number;
    qtdaSuplentes: number;
    qtdaEleitores: number;
    qtdaInscricoes: number;
    qtdaInscricoesAprovadas: number;
    qtdaInscricoesReprovadas: number;
    qtdaInscricoesPendentes: number;
    qtdaVotos: number;
    qtdaMinimaVotos: number;
}

export class LimiteDimensionamento {
  id: number;
  limite: number;
  intervaloAcrescimo: number;
  acrescimoEfetivos: number;
  acrescimoSuplentes: number;
}
