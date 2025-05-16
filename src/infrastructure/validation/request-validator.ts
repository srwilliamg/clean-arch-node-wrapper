import { ErrorBadRequest } from '../../utils';
import { IValidator } from '../../adapters/infrastructure/validator.interface';
import Joi from 'joi';

export class RequestValidator implements IValidator {
  constructor() {}

  validate = (schema: Joi.Schema, payload: any) => {
    const validationResult = schema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });

    const { error } = validationResult;

    if (error) {
      throw new ErrorBadRequest(error.details.map((v) => v.message).join(','));
    }

    return null;
  };
}
