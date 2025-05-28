import { AbstractRepository } from './base/abstract-repository';
import { IPokemonRepository } from '../../adapters';
import { Pokemon } from '../../domain/entities';
import { Repository } from 'typeorm';

export class PokemonRepository
  extends AbstractRepository<Pokemon>
  implements IPokemonRepository
{
  constructor(private repository: Repository<Pokemon>) {
    super(repository);
  }
}
