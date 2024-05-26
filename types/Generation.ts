export type Generation = {
  id: number;
  region: string;
  name: string;
  offset: number;
  limit: number;
};

export const generations: Generation[] = [
  {
    id: 1,
    region: "kanto",
    name: "generation I",
    offset: 0,
    limit: 151,
  },
  {
    id: 2,
    region: "johto",
    name: "generation II",
    offset: 151,
    limit: 100,
  },
  {
    id: 3,
    region: "hoenn",
    name: "generation III",
    offset: 251,
    limit: 135,
  },
  {
    id: 4,
    region: "sinnoh",
    name: "generation IV",
    offset: 386,
    limit: 107,
  },
  {
    id: 5,
    region: "unova",
    name: "generation V",
    offset: 494,
    limit: 155,
  },
  {
    id: 6,
    region: "kalos",
    name: "generation VI",
    offset: 649,
    limit: 72,
  },
  {
    id: 7,
    region: "alola",
    name: "generation VII",
    offset: 721,
    limit: 88,
  },
  {
    id: 8,
    region: "galar",
    name: "generation VIII",
    offset: 809,
    limit: 96,
  },
  {
    id: 9,
    region: "paldea",
    name: "generation IX",
    offset: 905,
    limit: 112, //120 in total
  },
];
