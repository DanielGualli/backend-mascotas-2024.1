import {Entity, model, property} from '@loopback/repository';

@model()
export class Provincia extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;


  constructor(data?: Partial<Provincia>) {
    super(data);
  }
}

export interface ProvinciaRelations {
  // describe navigational properties here
}

export type ProvinciaWithRelations = Provincia & ProvinciaRelations;
