import * as dotenv from 'dotenv';

import DATA_SOURCE from '../config/orm/data-source';
import { PokeApi } from './infrastructure/poke-api/poke-api';
import { PokemonController } from './application/controllers/pokemon';
import { PokemonUseCase } from './domain/use-cases/pokemon.use-case';
import { RequestValidator } from './infrastructure/validation/request-validator';
import { apiKeyAuth } from './application/middlewares/api-key-auth';
import cors from 'cors';
import express from 'express';
import { initRepositories } from './infrastructure/init-repository';
import { pokeRoutes } from './infrastructure/routes/pokemon';

dotenv.config();

const init = async () => {
  const ds = await DATA_SOURCE.initialize();

  const app = express();
  app.use(apiKeyAuth);

  const { endpointLogRepository, PokemonRepository } =
    await initRepositories(ds);
  const requestValidator = new RequestValidator();
  const pokeApiInstance = new PokeApi();

  const pokemonUseCase = new PokemonUseCase({
    PokeApi: pokeApiInstance,
    PokemonRepository,
  });
  const pokemonController = new PokemonController({
    requestValidator,
    pokemonUseCase,
  });

  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://localhost:5173',
  ];

  app.use(
    cors({
      origin: allowedOrigins,
    }),
  );
  pokeRoutes(app, pokemonController, endpointLogRepository);

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

init();
