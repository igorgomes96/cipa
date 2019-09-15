export enum Perfil {
  SESMT = 'SESMT',
  Eleitor = 'Eleitor'
}

export class Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  confirmacaoSenha: string;
  perfil: Perfil;
  codigoRecuperacao: string;
  usuarioAtivo: boolean;
}

export class AuthInfo {
  nome: string;
  id: number;
  contaAtiva: boolean;
  qtdaMaxEstabelecimentos: number;
  expiracao: Date;
  email: string;
  perfil: Perfil;
  nomePlano: string;
}

export class Conta {
  id: number;
  planoId: number;
  ativa: boolean;
  qtdaEstabelecimentos: number;
  dataInicio: Date;
  dataFim: Date;
  usuarios: Usuario[];

}
