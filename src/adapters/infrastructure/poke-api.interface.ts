import { IPokemonPaginatedResponse } from '../../infrastructure/poke-api/poke.interface';

export type IPokeApi = {
  getPokemon(identifier: string | number): Promise<IFindPokemonResponse> | null;
  getPokemonsPaginated(payload: {
    limit: number;
    offset: number;
  }): Promise<IPokemonPaginatedResponse> | null;
};

export type IFindPokemonResponse = {
  extId: number;
  name: string;
  weight: number;
  height: number;
  urlBackDefault: string;
  urlFrontDefault: string;
};
