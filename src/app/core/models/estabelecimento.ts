import { Empresa } from './empresa';

export class Estabelecimento {
    id: number;
    empresaId: number;
    cidade: string;
    endereco: string;
    descricao: string;

    empresa: Empresa;
}