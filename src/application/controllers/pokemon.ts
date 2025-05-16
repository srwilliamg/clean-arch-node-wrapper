import { ErrorNotFound } from '../../utils';
import { IPokemonController } from '../../adapters';
import { IPokemonUseCase } from '../../adapters/use-cases/pokemon.interface';
import { IValidator } from '../../adapters/infrastructure/validator.interface';
import { findPokemonSchema } from '../validation/store/find-pokemon';
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

  findPokemon = async ({ query }) => {
    const isErrorSchema = this.validator.validate(findPokemonSchema, query);

    if (isErrorSchema) {
      return isErrorSchema;
    }

    const pokemon = await this.pokemonUseCase.findPokemon(query);
    console.log('Found Pokemon:', pokemon);

    if (!pokemon) {
      throw new ErrorNotFound('Pokemon not found');
    }

    return mapFindPokemon(pokemon);
  };
}
