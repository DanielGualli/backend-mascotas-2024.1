import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Provincia,
  Ciudad,
} from '../models';
import {ProvinciaRepository} from '../repositories';

export class ProvinciaCiudadController {
  constructor(
    @repository(ProvinciaRepository) protected provinciaRepository: ProvinciaRepository,
  ) { }

  @get('/provincias/{id}/ciudads', {
    responses: {
      '200': {
        description: 'Array of Provincia has many Ciudad',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Ciudad>,
  ): Promise<Ciudad[]> {
    return this.provinciaRepository.ciudades(id).find(filter);
  }

  @post('/provincias/{id}/ciudads', {
    responses: {
      '200': {
        description: 'Provincia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ciudad)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Provincia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {
            title: 'NewCiudadInProvincia',
            exclude: ['id'],
            optional: ['provinciaId']
          }),
        },
      },
    }) ciudad: Omit<Ciudad, 'id'>,
  ): Promise<Ciudad> {
    return this.provinciaRepository.ciudades(id).create(ciudad);
  }

  @patch('/provincias/{id}/ciudads', {
    responses: {
      '200': {
        description: 'Provincia.Ciudad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Partial<Ciudad>,
    @param.query.object('where', getWhereSchemaFor(Ciudad)) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.provinciaRepository.ciudades(id).patch(ciudad, where);
  }

  @del('/provincias/{id}/ciudads', {
    responses: {
      '200': {
        description: 'Provincia.Ciudad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Ciudad)) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.provinciaRepository.ciudades(id).delete(where);
  }
}
