import { Empresa } from './empresa';

export class Estabelecimento {

    constructor({id, empresaId, cidade, endereco, descricao}) {
        this.id = id;
        this.empresaId = empresaId;
        this.cidade = cidade;
        this.endereco = endereco;
        this.descricao = descricao;
    }

    id: number;
    empresaId: number;
    cidade: string;
    endereco: string;
    descricao: string;

    empresa: Empresa;

    enderecoStr(): string {
        return `${this.endereco}, ${this.cidade}`;
    }
}
