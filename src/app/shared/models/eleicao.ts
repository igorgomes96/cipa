import { Voto } from './voto';
import { Estabelecimento } from './estabelecimento';
import { EtapaCronograma } from './cronograma';
import { Eleitor } from './eleitor';
import { Candidato } from './candidato';

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
    inscricoesFinalizadas: boolean;
    votacaoFinalizada: boolean;
    inicioInscricao: Date;
    terminoInscricao: Date;
    inicioVotacao: Date;
    terminoVotacao: Date;
    dataVotoEleitor: Date;

    candidato: Candidato;
    voto: Voto;

    public nomeGestao(): string {
        const fimGestao = this.gestao + this.duracaoGestao - 1;
        return `${this.gestao} - ${fimGestao}`;
    }
}
