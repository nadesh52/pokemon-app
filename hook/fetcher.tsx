"use client";
import { useEffect, useState } from "react";

export default function useFetcher(_offset: any, _limit: any) {
  // const [startIndex, setStartIndex] = useState(offset);
  // const [pages, setPages] = useState<number[]>([]);
  // const [perPage, setPerPage] = useState(0);
  // const [nextPage, setNextPage] = useState("");
  // const [prevPage, setPrevPage] = useState(0);
  // const [count, setCount] = useState(limit - offset);

  // const API_URL = "https://pokeapi.co/api/v2/pokemon";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const perPage = 20;
  //     const page = Math.ceil(count / perPage);
  //     const totalPages = [...Array(page + 1).keys()].slice(1);
  //     setPages(totalPages);

  //     const response = await fetch(
  //       `${API_URL}?offset=${startIndex}&limit=${perPage}`
  //     );
  //     const jsonData = await response.json();

  //     setNextPage(jsonData.next);

  //     // console.log(count, perPage, jsonData);
  //   };

  //   fetchData();
  // }, []);
  // return {
  //   startIndex,
  //   nextPage,
  //   prevPage,
  //   count,
  //   pages,
  //   setPerPage,
  //   setStartIndex,
  // };

  ///////////////////////

  const [pokemonsData, setPokemonsData] = useState<any[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [reFetch, setReFetch] = useState({});
  const [limit, setLimit] = useState(_limit);
  const [offset, setOffset] = useState(_offset);

  const API_URL = `https://pokeapi.co/api/v2/pokemon`;

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      const res = await fetch(`${API_URL}?offset=${offset}&limit=${limit}`);
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
  }, [limit, offset, reFetch]);
  return { pokemonsData, isPending, setLimit, setOffset, setReFetch };
}

// }
