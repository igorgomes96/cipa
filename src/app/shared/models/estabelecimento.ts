import { Empresa } from './empresa';

export class Estabelecimento {

    constructor({id, empresaId, cidade, endereco, descricao, grupoId, grupo}) {
        this.id = id;
        this.empresaId = empresaId;
        this.cidade = cidade;
        this.endereco = endereco;
        this.descricao = descricao;
        this.grupo = grupo,
        this.grupoId = grupoId;
    }

    id: number;
    empresaId: number;
    cidade: string;
    endereco: string;
    descricao: string;
    grupoId: number;
    grupo: string;

    empresa: Empresa;

    enderecoStr(): string {
        return `${this.endereco}, ${this.cidade}`;
    }
}
