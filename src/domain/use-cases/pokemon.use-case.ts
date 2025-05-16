import { IPokemonUseCase } from '../../adapters/use-cases/pokemon.interface';

// interface IDependencies {}

export class PokemonUseCase implements IPokemonUseCase {
  constructor() {}

  findPokemon = async (payload) => {
    return payload;
  };
}
