import { IPokemonPaginatedResponse } from '../../infrastructure/poke-api/poke.interface';

export type IPokeApi = {
  getPokemon(identifier: string | number): Promise<IFindPokemonResponse> | null;
  getPokemonsPaginated(payload: {
    limit: number;
    offset: number;
  }): Promise<IPokemonPaginatedResponse> | null;
};

export type IFindPokemonResponse = {
  id: number;
  name: string;
  weight: number;
  height: number;
  backDefault: string;
  frontDefault: string;
};
