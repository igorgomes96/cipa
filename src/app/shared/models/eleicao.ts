import { Estabelecimento } from './estabelecimento';
import { EtapaCronograma } from './cronograma';
import { Eleitor } from './eleitor';

export class Eleicao {
    id: number;
    gestao: number;
    duracaoGestao: number;
    estabelecimentoId: number;
    cronograma: EtapaCronograma[];
    estabelecimento: Estabelecimento;
    eleitores: Eleitor[];
    terminoMandatoAnterior: Date;
    dataInicio: Date;
    etapaAtual: EtapaCronograma;
    grupoId: number;
    grupo: string;
    qtdaEfetivos: number;
    qtdaSuplentes: number;

    public nomeGestao(): string {
        const fimGestao = this.gestao + this.duracaoGestao - 1;
        return `${this.gestao} - ${fimGestao}`;
    }
}
