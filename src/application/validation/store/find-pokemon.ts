import * as Joi from 'joi';

export const findPokemonSchema = Joi.object({
  identifier: Joi.alternatives(Joi.string().min(1), Joi.number().min(1)),
});

export const getPokemonsSchema = Joi.object({
  limit: Joi.number().min(1).required(),
  offset: Joi.number().min(0).required(),
});
