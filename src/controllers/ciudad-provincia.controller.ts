import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ciudad,
  Provincia,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadProvinciaController {
  constructor(
    @repository(CiudadRepository)
    public ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/provincia', {
    responses: {
      '200': {
        description: 'Provincia belonging to Ciudad',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Provincia),
          },
        },
      },
    },
  })
  async getProvincia(
    @param.path.number('id') id: typeof Ciudad.prototype.id,
  ): Promise<Provincia> {
    return this.ciudadRepository.provincia(id);
  }
}
