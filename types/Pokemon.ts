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
  sprites?: string;
  species: string;
  abilities: PokemonAbility[];
  types: PokemonType[];
  stats: PokemonStats[];
  egg_groups: PokemonEggGroups[];
  evolution_chain: string;
  hatch_counter: number;
  names: PokemonNames[];
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
  {
    name: "all",
    color: {
      normal: "#68A090",
      dark: "#44685E",
      light: "#9DC1B7",
    },
  },
  {
    name: "bug",
    color: {
      normal: "#A8B820",
      dark: "#6D7815",
      light: "#C6D16E",
    },
  },
  {
    name: "dark",
    color: {
      normal: "#705848",
      dark: "#49392F",
      light: "#A29288",
    },
  },
  {
    name: "dragon",
    color: {
      normal: "#7038F8",
      dark: "#4924A1",
      light: "#A27DFA",
    },
  },
  {
    name: "electric",
    color: {
      normal: "#F8D030",
      dark: "#A1871F",
      light: "#FAE078",
    },
  },
  {
    name: "fairy",
    color: {
      normal: "#EE99AC",
      dark: "#9B6470",
      light: "#F4BDC9",
    },
  },
  {
    name: "fighting",
    color: {
      normal: "#C03028",
      dark: "#7D1F1A",
      light: "#D67873",
    },
  },
  {
    name: "fire",
    color: {
      normal: "#F08030",
      dark: "#9C531F",
      light: "#F5AC78",
    },
  },
  {
    name: "flying",
    color: {
      normal: "#A890F0",
      dark: "#6D5E9C",
      light: "#C6B7F5",
    },
  },
  {
    name: "ghost",
    color: {
      normal: "#705898",
      dark: "#493963",
      light: "#A292BC",
    },
  },
  {
    name: "grass",
    color: {
      normal: "#78C850",
      dark: "#4E8234",
      light: "#A7DB8D",
    },
  },
  {
    name: "ground",
    color: {
      normal: "#E0C068",
      dark: "#927D44",
      light: "#EBD69D",
    },
  },
  {
    name: "ice",
    color: {
      normal: "#98D8D8",
      dark: "#638D8D",
      light: "#BCE6E6",
    },
  },
  {
    name: "normal",
    color: {
      normal: "#A8A878",
      dark: "#6D6D4E",
      light: "#C6C6A7",
    },
  },
  {
    name: "poison",
    color: {
      normal: "#A040A0",
      dark: "#682A68",
      light: "#C183C1",
    },
  },
  {
    name: "psychic",
    color: {
      normal: "#F85888",
      dark: "#A13959",
      light: "#FA92B2",
    },
  },
  {
    name: "rock",
    color: {
      normal: "#B8A038",
      dark: "#786824",
      light: "#D1C17D",
    },
  },
  {
    name: "steel",
    color: {
      normal: "#B8B8D0",
      dark: "#787887",
      light: "#D1D1E0",
    },
  },
  {
    name: "water",
    color: {
      normal: "#6890F0",
      dark: "#445E9C",
      light: "#9DB7F5",
    },
  },
];
