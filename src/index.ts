import * as dotenv from 'dotenv';

import DATA_SOURCE from '../config/orm/data-source';
import { PokeApi } from './infrastructure/poke-api/poke-api';
import { PokemonController } from './application/controllers/pokemon';
import { PokemonUseCase } from './domain/use-cases/pokemon.use-case';
import { RequestValidator } from './infrastructure/validation/request-validator';
import { apiKeyAuth } from './application/middlewares/api-key-auth';
import express from 'express';
import { initRepositories } from './infrastructure/init-repository';
import { pokeRoutes } from './infrastructure/routes/pokemon';

dotenv.config();

const init = async () => {
  const ds = await DATA_SOURCE.initialize();

  const app = express();
  app.use(apiKeyAuth);

  const { endpointLogRepository } = await initRepositories(ds);
  const requestValidator = new RequestValidator();
  const pokeApiInstance = new PokeApi();

  const pokemonUseCase = new PokemonUseCase({ PokeApi: pokeApiInstance });
  const pokemonController = new PokemonController({
    requestValidator,
    pokemonUseCase,
  });

  pokeRoutes(app, pokemonController, endpointLogRepository);

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

init();
