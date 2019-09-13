export enum Perfil {
  SESMT = 'SESMT',
  Eleitor = 'Eleitor'
}

export class Usuario {
  nome: string;
  email: string;
  senha: string;
  confirmacaoSenha: string;
  perfil: Perfil;
  codigoRecuperacao: string;
}

export class AuthInfo {
  nome: string;
  conta: number;
  contaValida: boolean;
  qtdaMaxEstabelecimentos: number;
  expiracao: Date;
  email: string;
  perfil: Perfil;
}
