import { IPokeApi } from '../../adapters/infrastructure';
import { IPokemonUseCase } from '../../adapters/use-cases/pokemon.interface';

interface IDependencies {
  PokeApi: IPokeApi;
}

export class PokemonUseCase implements IPokemonUseCase {
  private PokeApi: IPokeApi;
  constructor(dependencies: IDependencies) {
    this.PokeApi = dependencies.PokeApi;
  }

  findPokemon = async ({ identifier }: { identifier: number | string }) => {
    return await this.PokeApi.getPokemon(identifier);
  };

  getPokemons = async (payload: { limit: number; offset: number }) => {
    return this.PokeApi.getPokemonsPaginated(payload);
  };
}
