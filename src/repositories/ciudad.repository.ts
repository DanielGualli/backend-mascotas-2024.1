import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Provincia} from '../models';
import {ProvinciaRepository} from './provincia.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly provincia: BelongsToAccessor<Provincia, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ProvinciaRepository') protected provinciaRepositoryGetter: Getter<ProvinciaRepository>,
  ) {
    super(Ciudad, dataSource);
    this.provincia = this.createBelongsToAccessorFor('provincia', provinciaRepositoryGetter,);
    this.registerInclusionResolver('provincia', this.provincia.inclusionResolver);
  }
}
