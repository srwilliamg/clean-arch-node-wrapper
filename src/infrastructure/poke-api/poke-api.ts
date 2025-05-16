import { ErrorNotFound } from '../../utils';
import { IGetApiPokemon } from './poke.interface';
import { IPokeApi } from '../../adapters/infrastructure/poke-api.interface';

export class PokeApi implements IPokeApi {
  private API_URL = 'https://pokeapi.co/api/v2';

  getPokemon = async (pokeName: string): Promise<IGetApiPokemon> => {
    const response = await fetch(`${this.API_URL}/ability/${pokeName}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      //   body: JSON.stringify(pokeName),
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  };
}
