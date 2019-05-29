import { Empresa } from './empresa';

export class Unidade {
    id: number;
    empresaId: number;
    cidade: string;
    endereco: string;
    descricao: string;

    empresa: Empresa;
}
