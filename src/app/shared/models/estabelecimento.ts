import { Empresa } from './empresa';

export class Estabelecimento {

    id: number;
    cidade: string;
    endereco: string;
    descricao: string;
    empresaId: number;
    grupoId: number;
    grupo: string;

    empresa: Empresa;
}
