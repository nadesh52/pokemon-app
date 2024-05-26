export const getPokemons = async (offset: number, limit: number) => {
  const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return await fetch(URL);
};

export const getPokemon = async (pokeId: string) => {
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
  return await fetch(URL);
};
