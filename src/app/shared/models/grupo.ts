import { LimiteDimensionamento, Dimensionamento } from './dimensionamento';

export class Grupo {
    id: number;
    codigoGrupo: string;

    limiteDimensionamento: LimiteDimensionamento;
    dimensionamentos: Dimensionamento[];
}
