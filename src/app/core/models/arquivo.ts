export class Arquivo {
    id: string;
    path: string;
    dataUpload: Date;
    dataCriacao: Date;
    nome: string;
    extensao: string;
    content: Blob;
    tamanho: number;
    contentType: string;
}
