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

  const allowedOrigins = ['http://localhost:4000'];

  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
  };

  app.use(apiKeyAuth);
  app.use(cors(corsOptions));

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

  pokeRoutes(app, pokemonController, endpointLogRepository);

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

init();
