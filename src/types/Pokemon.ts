export const initPokemon = {
  id: 0,
  name: "",
  height: 0,
  weight: 0,
  sprites: { other: { "official-artwork": { front_default: "" } } },
  species: "",
  abilities: [],
  types: [],
  stats: [],
  egg_groups: [],
  evolution_chain: "",
  hatch_counter: 0,
  names: [],
  // shape: '',
  growth_rate: { name: "" },
  genera: "",
  japanName: "",
  romanjiName: "",
};

export type PokemonSingle = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: string;
  species: string;
  abilities: PokemonAbility[];
  types: PokemonType[];
  stats: PokemonStats[];
  egg_groups: PokemonEggGroups[];
  evolution_chain: string;
  hatch_counter: number;
  names: PokemonNames[];
  // shape: PokemonShape | null;
  growth_rate: PokemonGrowthRate;
  genera: string;
  japanName: string;
  romanjiName: string;
};

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
  type?: {
    name: string;
    url: string;
  };
};

export type PokemonSprite = {
  front_default: string;
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
};

export type PokemonAbility = {
  slot: number;
  ability?: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
};

export type PokemonStats = {
  base_stat: number;
  effort: number;
  stat?: {
    name: string;
    url: string;
  };
};

export type PokemonEggGroups = {
  name: string;
  url?: string;
};

export type PokemonNames = {
  language?: {
    name: string;
    url: string;
  };
  name: string;
};

export type PokemonShape = {
  name: string;
  url?: string;
};

export type PokemonGrowthRate = {
  name: string;
  url?: string;
};

export type PokemonGenera = {
  genus: string;
  language?: {
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
