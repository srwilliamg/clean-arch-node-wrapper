import * as Joi from 'joi';

export const findPokemonSchema = Joi.object({
  // coordinateX: Joi.number().min(-90).max(90).required(),
  // coordinateY: Joi.number().min(-180).max(180).required(),
});
