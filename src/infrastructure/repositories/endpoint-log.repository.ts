import { AbstractRepository } from './base/abstract-repository';
import { EndpointLog } from '../../domain/entities';
import { IEndpointLogRepository } from '../../adapters';
import { Repository } from 'typeorm';

export class EndpointLogRepository
  extends AbstractRepository<EndpointLog>
  implements IEndpointLogRepository
{
  constructor(private repository: Repository<EndpointLog>) {
    super(repository);
  }
}
