import { EndpointLog, Pokemon } from '../domain/entities';
import { EndpointLogRepository, PokemonRepository } from './repositories';

import { DataSource } from 'typeorm';

export const initRepositories = (ds: DataSource) => ({
  endpointLogRepository: new EndpointLogRepository(
    ds.getRepository(EndpointLog),
  ),
  PokemonRepository: new PokemonRepository(ds.getRepository(Pokemon)),
});
