import { IEndpointLogRepository, IPokemonController } from '../../adapters';

import { Application } from 'express-serve-static-core';
import { handleRequest } from '../../utils/handle-request';

const route = '/pokemon';
export const pokeRoutes = (
  app: Application,
  controller: IPokemonController,
  endpointLogRepository: IEndpointLogRepository,
) => {
  app.get(
    `${route}/:identifier`,
    handleRequest(controller.findPokemon, endpointLogRepository),
  );
  app.get(route, handleRequest(controller.getPokemons, endpointLogRepository));
};
