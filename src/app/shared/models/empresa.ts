import { Estabelecimento } from './estabelecimento';

export class Empresa {
    id: number;
    cnpj: string;
    razaoSocial: string;
    informacoesGerais: string;

    estabelecimentos: Estabelecimento[];
}
