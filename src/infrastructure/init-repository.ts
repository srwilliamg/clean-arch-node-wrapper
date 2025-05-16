import { DataSource } from 'typeorm';
import { EndpointLog } from '../domain/entities';
import { EndpointLogRepository } from './repositories';

export const initRepositories = (ds: DataSource) => ({
  endpointLogRepository: new EndpointLogRepository(
    ds.getRepository(EndpointLog),
  ),
});
