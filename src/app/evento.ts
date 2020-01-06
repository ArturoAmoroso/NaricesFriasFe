export class Evento
{
    id: number;
    titulo: string;
    fecha: Date;
    lugar: string;
    hora: string;
    descripcion: string;
    imagen?: string;
}

export enum Mes{
    Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre
}

