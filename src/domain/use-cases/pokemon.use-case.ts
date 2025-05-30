import { ErrorNotFound } from '../../utils';
import { IPokeApi } from '../../adapters/infrastructure';
import { IPokemonRepository } from '../../adapters';
import { IPokemonUseCase } from '../../adapters/use-cases/pokemon.interface';
import lodash from 'lodash';

interface IDependencies {
  PokeApi: IPokeApi;
  PokemonRepository: IPokemonRepository;
}

export class PokemonUseCase implements IPokemonUseCase {
  private PokeApi: IPokeApi;
  private PokemonRepository: IPokemonRepository;
  constructor(dependencies: IDependencies) {
    this.PokeApi = dependencies.PokeApi;
    this.PokemonRepository = dependencies.PokemonRepository;
  }

  findPokemon = async ({ identifier }: { identifier: number | string }) => {
    return await this.PokeApi.getPokemon(identifier);
  };

  getPokemons = async (payload: { limit: number; offset: number }) => {
    const pokemons = await this.PokeApi.getPokemonsPaginated(payload);
    if (!pokemons) {
      throw new ErrorNotFound('Pokemons not found');
    }

    const apiDataWithIds = pokemons.results.map(({ url, name }) => {
      const id = url.split('/').at(-2);
      return { id: +id, url, name };
    });

    const existingPokemons = await this.PokemonRepository.findIn(
      'extId',
      apiDataWithIds.map(({ id }) => +id),
    );

    const nonExisting = lodash.differenceWith(
      apiDataWithIds,
      existingPokemons,
      (a, b) => {
        return +a.id === +b.extId;
      },
    );

    const pokemonDetails = await Promise.all(
      nonExisting.map(({ id }) => this.PokeApi.getPokemon(+id)),
    );

    const saved =
      pokemonDetails.length > 0
        ? await this.PokemonRepository.saveMany(
            pokemonDetails.map(
              ({
                extId,
                height,
                name,
                urlBackDefault,
                urlFrontDefault,
                weight,
              }) => {
                return this.PokemonRepository.create({
                  extId,
                  height,
                  name,
                  urlBackDefault,
                  urlFrontDefault,
                  weight,
                });
              },
            ),
          )
        : [];

    return [...existingPokemons, ...saved].sort((v) => v.extId);
  };
}
