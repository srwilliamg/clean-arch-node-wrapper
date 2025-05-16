import {
  DataSource,
  DeepPartial,
  DeleteResult,
  EntityManager,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectId,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';

import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IEntity {
  id: number;
  [key: string]: any;
}

export type IUpdateCriteria<T> =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectId
  | ObjectId[]
  | FindOptionsWhere<T>;

export interface IFindByIdIn<E> {
  findByIdIn(
    ids: number[],
    { relations }?: { relations: string[] },
  ): Promise<E[]>;
}

export interface IFindIn<E> {
  findIn(
    field: keyof E,
    ids: (number | string)[],
    { relations, where }?: { relations?: string[]; where?: any },
  ): Promise<E[]>;
}

export interface ICreatorRepository<Entity> {
  create(data: DeepPartial<Entity>): Entity;
  createMany(data: DeepPartial<Entity>[]): Entity[];
  save(data: DeepPartial<Entity>): Promise<Entity>;
  saveMany(data: DeepPartial<Entity>[]): Promise<Entity[]>;
}

export interface IFinderRepository<Entity> {
  findById?(id: number, config?: { relations: string[] }): Promise<Entity>;
  findByCondition(filterCondition: FindOneOptions<Entity>): Promise<Entity>;
  findAll(options?: FindManyOptions<Entity>): Promise<Entity[]>;
  findWithRelations(relations: FindManyOptions<Entity>): Promise<Entity[]>;
  findOneWithRelations(relations: FindManyOptions<Entity>): Promise<Entity>;
}

export interface IUpdaterRepository<Entity> {
  update(
    criteria: IUpdateCriteria<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult>;
}

export interface IRemoverRepository<Entity> {
  remove(data: IUpdateCriteria<Entity>): Promise<UpdateResult>;
  removeManyById(
    data: number[] | ObjectId[],
  ): Promise<UpdateResult | DeleteResult>;
}

export type IManyRepository<Entity> = ICreatorRepository<Entity> &
  IFinderRepository<Entity> &
  IRemoverRepository<Entity> & {
    getEntityTarget(): EntityTarget<Entity>;
    get target(): EntityTarget<Entity>;
  };

export interface ITransactionalOperation<T> {
  (entity: EntityTarget<T>, manager: EntityManager): Promise<T | T[]>;
}

export interface ITransactionalEntity<T> {
  transaction<R>(
    transactionalOperation: ITransactionalOperation<T>,
  ): Promise<T & R>;
}

export interface IDataSourceEntity {
  dataSource: DataSource;
  createQueryBuilder(): SelectQueryBuilder<any>;
}

export type IEntityRepository<Entity> = IFindByIdIn<Entity> &
  IFindIn<Entity> &
  ICreatorRepository<Entity> &
  IFinderRepository<Entity> &
  IUpdaterRepository<Entity> &
  IRemoverRepository<Entity> & {
    get target(): EntityTarget<Entity>;
  };
