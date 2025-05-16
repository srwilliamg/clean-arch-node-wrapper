import { EndpointLog } from '../../domain/entities';
import { IEntityRepository } from '../infrastructure/repository.interface';

export type IEndpointLogRepository = IEntityRepository<EndpointLog>;
