import {
  findPokemonSchema,
  getPokemonsSchema,
} from '../validation/store/find-pokemon';

import { ErrorNotFound } from '../../utils';
import { IPokemonController } from '../../adapters';
import { IPokemonUseCase } from '../../adapters/use-cases/pokemon.interface';
import { IValidator } from '../../adapters/infrastructure/validator.interface';
import { mapFindPokemon } from '../presenters/pokemon/find-pokemon';

export class PokemonController implements IPokemonController {
  private validator: IValidator;
  private pokemonUseCase: IPokemonUseCase;

  constructor({
    requestValidator,
    pokemonUseCase,
  }: {
    requestValidator: IValidator;
    pokemonUseCase: IPokemonUseCase;
  }) {
    this.validator = requestValidator;
    this.pokemonUseCase = pokemonUseCase;
  }

  findPokemon = async ({ params }) => {
    const isErrorSchema = this.validator.validate(findPokemonSchema, params);

    if (isErrorSchema) {
      return isErrorSchema;
    }

    const pokemon = await this.pokemonUseCase.findPokemon(params);
    console.log('Found Pokemon:', pokemon);

    if (!pokemon) {
      throw new ErrorNotFound('Pokemon not found');
    }

    return mapFindPokemon(pokemon);
  };

  getPokemons = async ({ query }) => {
    const isErrorSchema = this.validator.validate(getPokemonsSchema, query);

    if (isErrorSchema) {
      return isErrorSchema;
    }

    return this.pokemonUseCase.getPokemons(query);
  };
}
