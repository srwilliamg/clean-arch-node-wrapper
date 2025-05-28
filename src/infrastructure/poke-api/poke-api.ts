import {
  IFindPokemonResponse,
  IPokeApi,
} from '../../adapters/infrastructure/poke-api.interface';
import { IGetApiPokemon, IPokemonPaginatedResponse } from './poke.interface';

import { ErrorNotFound } from '../../utils';

export class PokeApi implements IPokeApi {
  private API_URL = 'https://pokeapi.co/api/v2';

  getPokemon = async (
    pokeIdentifier: string | number,
  ): Promise<IFindPokemonResponse> => {
    const response = await fetch(`${this.API_URL}/pokemon/${pokeIdentifier}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    const jsonResponse: IGetApiPokemon = await response.json();

    const {
      id: extId,
      name,
      weight,
      height,
      sprites: { back_default: urlBackDefault, front_default: urlFrontDefault },
    } = jsonResponse;

    return {
      extId,
      name,
      weight,
      height,
      urlBackDefault,
      urlFrontDefault,
    };
  };

  getPokemonsPaginated = async ({
    limit = 20,
    offset = 20,
  }: {
    limit: number;
    offset: number;
  }): Promise<IPokemonPaginatedResponse> => {
    const response = await fetch(
      `${this.API_URL}/pokemon/?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  };
}
