import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';

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

  @hasMany(() => Ciudad)
  ciudads: Ciudad[];

  constructor(data?: Partial<Provincia>) {
    super(data);
  }
}

export interface ProvinciaRelations {
  // describe navigational properties here
}

export type ProvinciaWithRelations = Provincia & ProvinciaRelations;
