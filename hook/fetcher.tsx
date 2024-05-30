import { useEffect, useState } from "react";

export default function useFetcher(_offset: any, _limit: any) {
  const [pokemonsData, setPokemonsData] = useState<any[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [reFetch, setReFetch] = useState({});

  const API_URL = `https://pokeapi.co/api/v2/pokemon`;

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      const res = await fetch(`${API_URL}?offset=${_offset}&limit=${_limit}`);
      const jsonData = await res.json();

      const allPokemon = jsonData.results.map(async (p: any) => {
        const fetchPokemon = await fetch(p.url);
        const pokemonData = await fetchPokemon.json();

        const pokemon: any = {
          id: pokemonData.id,
          name: pokemonData.name,
          height: pokemonData.height,
          weight: pokemonData.weight,
          sprite:
            pokemonData.sprites.other["official-artwork"]["front_default"],
          types: pokemonData.types,
        };
        return pokemon;
      });

      const p = await Promise.all(allPokemon).then((values) => {
        return values;
      });

      setPokemonsData(p);
      setIsPending(false);
    };

    fetchData();
  }, [reFetch]);
  return { pokemonsData, isPending, setReFetch };
}
