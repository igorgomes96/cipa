import { Unidade } from './unidade';
import { EtapaCronograma } from './cronograma';
import { Eleitor } from './eleitor';

export class Eleicao {
    id: number;
    gestao: number;
    duracaoGestao: number;
    unidadeId: number;
    cronograma: EtapaCronograma[];
    unidade: Unidade;
    eleitores: Eleitor[];

    public nomeGestao(): string {
        const fimGestao = this.gestao + this.duracaoGestao - 1;
        return `${this.gestao} - ${fimGestao}`;
    }
}
