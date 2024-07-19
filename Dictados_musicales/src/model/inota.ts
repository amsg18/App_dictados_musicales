// Usamos los tipos de datos de Vexflow
export interface INota {
  pitch: string;
  duration: string;
  resaltar?: boolean;
}

export interface ICompas {
  notas: INota[];
}

export interface IPentagrama {
  compases: ICompas[];
}
