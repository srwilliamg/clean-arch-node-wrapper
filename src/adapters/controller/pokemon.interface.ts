interface IDefaultPayload {
  query?: any;
  body?: any;
  params?: any;
}

export type IPokemonController = {
  findPokemon(payload: IDefaultPayload);
  getPokemons(payload: IDefaultPayload);
};
