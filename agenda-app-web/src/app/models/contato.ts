import { EntidadeBase } from './entidade-base';

export interface Contato extends EntidadeBase {
    nome: string,
    telefone: string,
    celular: string,
    email: string
}