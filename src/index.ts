import * as dotenv from 'dotenv';
import * as express from 'express';

import DATA_SOURCE from '../config/orm/data-source';
import { PokemonController } from './application/controllers/pokemon';
import { PokemonUseCase } from './domain/use-cases/pokemon.use-case';
import { RequestValidator } from './infrastructure/validation/request-validator';
import { apiKeyAuth } from './application/middlewares/api-key-auth';
import { initRepositories } from './infrastructure/init-repository';
import { storeRoutes } from './infrastructure/routes/pokemon';

dotenv.config();

const init = async () => {
  const ds = await DATA_SOURCE.initialize();

  const app = express();
  app.use(apiKeyAuth);

  const { endpointLogRepository } = await initRepositories(ds);

  const requestValidator = new RequestValidator();
  const pokemonUseCase = new PokemonUseCase();
  const storeController = new PokemonController({
    requestValidator,
    pokemonUseCase,
  });

  storeRoutes(app, storeController, endpointLogRepository);

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

init();
