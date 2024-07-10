import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Provincia, ProvinciaRelations, Ciudad} from '../models';
import {CiudadRepository} from './ciudad.repository';

export class ProvinciaRepository extends DefaultCrudRepository<
  Provincia,
  typeof Provincia.prototype.id,
  ProvinciaRelations
> {

  public readonly ciudads: HasManyRepositoryFactory<Ciudad, typeof Provincia.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Provincia, dataSource);
    this.ciudads = this.createHasManyRepositoryFactoryFor('ciudads', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudads', this.ciudads.inclusionResolver);
  }
}
