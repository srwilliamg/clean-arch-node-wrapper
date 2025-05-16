import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  In,
  Repository,
  UpdateResult,
} from 'typeorm';
import {
  IEntityRepository,
  IUpdateCriteria,
} from '../../../adapters/infrastructure/repository.interface';

import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<Entity>
  implements IEntityRepository<Entity>
{
  private _entity: Repository<Entity>;

  protected constructor(_entity: Repository<Entity>) {
    this._entity = _entity;
  }

  get target() {
    return this._entity.target;
  }

  public async save(data: DeepPartial<Entity>): Promise<Entity> {
    return this._entity.save(data);
  }
  public async saveMany(data: DeepPartial<Entity>[]): Promise<Entity[]> {
    return this._entity.save(data);
  }
  public create(data: DeepPartial<Entity>): Entity {
    return this._entity.create(data);
  }
  public createMany(data: DeepPartial<Entity>[]): Entity[] {
    return this._entity.create(data);
  }

  public async findById(
    id: number,
    config: { relations: string[] } = null,
  ): Promise<Entity> {
    let options: FindOneOptions<Entity> = {
      where: {
        id,
      } as any,
    };

    if (config) {
      options = { ...options, ...config };
    }

    return this._entity.findOne(options);
  }

  public async findByCondition(
    filterCondition: FindOneOptions<Entity>,
  ): Promise<Entity> {
    return this._entity.findOne(filterCondition);
  }

  public async findWithRelations(
    relations: FindManyOptions<Entity>,
  ): Promise<Entity[]> {
    return this._entity.find(relations);
  }

  public async findAll(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this._entity.find(options);
  }

  public async remove(data: IUpdateCriteria<Entity>): Promise<UpdateResult> {
    return this._entity.softDelete(data);
  }

  public async removeManyById(data: number[]): Promise<UpdateResult> {
    return this._entity.softDelete(data);
  }

  public async findOneWithRelations(
    relations: FindManyOptions<Entity>,
  ): Promise<Entity> {
    return this._entity.findOne(relations);
  }

  public async update(
    criteria: IUpdateCriteria<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult> {
    return this._entity.update(criteria, partialEntity);
  }

  findByIdIn(ids: number[], { relations = [] } = {}): Promise<Entity[]> {
    const options: FindOptionsWhere<any> = {
      id: In(ids),
    };
    return this._entity.find({ where: options, relations });
  }

  findIn(
    field: keyof Entity,
    ids: (number | string)[],
    { relations = [], where = {} } = {},
  ): Promise<Entity[]> {
    let options: FindOptionsWhere<any> = {
      [field]: In(ids),
    };

    if (where) {
      options = { ...where, ...options };
    }
    return this._entity.find({ where: options, relations });
  }
}
