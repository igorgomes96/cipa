import { Dimensionamento } from './dimensionamento';
import { Voto } from './voto';
import { Estabelecimento } from './estabelecimento';
import { EtapaCronograma } from './cronograma';
import { Eleitor } from './eleitor';
import { Inscricao } from './inscricao';

export class Eleicao {
    id: number;
    gestao: number;
    duracaoGestao: number;
    estabelecimentoId: number;
    cronograma: EtapaCronograma[];
    estabelecimento: Estabelecimento;
    dataInicio: Date;
    dataCadastro: Date;
    dataFinalizacao: Date;
    grupoId: number;
    grupo: string;
    eleitores: Eleitor[];
    terminoMandatoAnterior: Date;
    etapaAtual: EtapaCronograma;
    // qtdaEfetivos: number;
    // qtdaSuplentes: number;
    inscricoesFinalizadas: boolean;
    votacaoFinalizada: boolean;
    inicioInscricao: Date;
    terminoInscricao: Date;
    inicioVotacao: Date;
    terminoVotacao: Date;
    dimensionamento: Dimensionamento;

    candidato: Inscricao;
    voto: Voto;
    usuarioEleitor: boolean;

    public nomeGestao(): string {
        const fimGestao = this.gestao + this.duracaoGestao - 1;
        return `${this.gestao} - ${fimGestao}`;
    }
}
