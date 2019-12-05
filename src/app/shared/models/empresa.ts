import { Estabelecimento } from './estabelecimento';

export class Empresa {
    id: number;
    razaoSocial: string;
    cnpj: string;
    informacoesGerais: string;

    estabelecimentos: Estabelecimento[];
}
