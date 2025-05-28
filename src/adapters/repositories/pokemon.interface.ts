import { IEntityRepository } from '../infrastructure/repository.interface';
import { Pokemon } from '../../domain/entities';

export type IPokemonRepository = IEntityRepository<Pokemon>;
