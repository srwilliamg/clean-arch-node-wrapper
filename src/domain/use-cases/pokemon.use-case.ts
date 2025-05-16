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

  findPokemon = async ({ name }: { name: string }) => {
    const res = await this.PokeApi.getPokemon(name);
    console.log('🚀 ~ PokemonUseCase ~ findPokemon= ~ res:', res);

    return res;
  };
}
