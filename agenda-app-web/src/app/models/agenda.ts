import { EntidadeBase } from './entidade-base';

export interface Agenda extends EntidadeBase {
    dataAgendamento: Date,
    descricao: string
}