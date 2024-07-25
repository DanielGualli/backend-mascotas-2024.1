import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Provincia} from './provincia.model';

@model({
  settings: {
    foreignKeys: {
      fk_provin_ciudad_id: {
        name: 'fk_provin_ciudad_id',
        entity: 'provincia',
        entityKey: 'id',
        foreingnKey: 'provinciaId',
      },
    },
  },
})
export class Ciudad extends Entity {
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

  @belongsTo(() => Provincia)
  provinciaId: number;

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
