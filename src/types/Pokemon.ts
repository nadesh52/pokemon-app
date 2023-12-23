export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprite: string;
  types: PokemonType[];
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonData = {
  name: string;
  url: string;
};

export const typePokemon = [
  "all",
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];
