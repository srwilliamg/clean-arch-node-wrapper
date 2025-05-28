import { IFindPokemonResponse } from '../infrastructure/poke-api.interface';

export type IPokemonUseCase = {
  findPokemon(payload: {
    identifier: string | number;
  }): Promise<IFindPokemonResponse>;
  getPokemons(payload: {
    limit: number;
    offset: number;
  }): Promise<IFindPokemonResponse[]>;
};
