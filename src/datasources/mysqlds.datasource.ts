import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mysqlds',
  connector: 'mysql',
  url: 'localhost',
  host: '3306',
  port: NaN,
  user: '',
  password: '',
  database: 'PetpocketDB'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MysqldsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mysqlds';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mysqlds', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
