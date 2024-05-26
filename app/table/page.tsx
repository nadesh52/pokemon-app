"use client";
import { useState, useEffect } from "react";
import { Pokemon, PokemonData } from "../../types/Pokemon";
import { Generation, generations, getPokemons } from "../../utils/fetcher";
import GenSelection from "../../components/GenSelection";
import FilterType from "../../components/FilterType";
import Card from "../../components/Card";

const PokemonsTable = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string>("all");
  const [isPending, setIsPending] = useState<boolean>(true);
  const [gens, setGens] = useState<Generation>(generations[0]);

  const fetchData = async (gen: Generation) => {
    setIsPending(true);

    const jsonData = await getPokemons(gen.offset, gen.limit).then((res) =>
      res.json()
    );

    const allPokemon = jsonData.results.map(async (p: PokemonData) => {
      const fetchPokemon = await fetch(p.url);
      const pokemonData = await fetchPokemon.json();

      const pokemon: Pokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        height: pokemonData.height,
        weight: pokemonData.weight,
        sprite: pokemonData.sprites.other["official-artwork"]["front_default"],
        types: pokemonData.types,
      };
      return pokemon;
    });

    const p = Promise.all(allPokemon).then((values) => {
      return values;
    });

    setPokemons(await p);
    setSelectedTypes("all");
    setIsPending(false);
  };

  useEffect(() => {
    fetchData(gens);
  }, [gens]);

  return (
    <>
      {isPending ? (
        <div className="__table--loading">
          <p>...loading</p>
        </div>
      ) : (
        <section>
          <div className="__table__input">
            <GenSelection selectedGen={(e: any) => setGens(JSON.parse(e))} />
            <FilterType selectedType={(e: any) => setSelectedTypes(e)} />
            <span className="__text--gen">{gens.region.toUpperCase()}</span>
          </div>

          <div className="__table">
            {selectedTypes === "all" ? (
              <>
                {pokemons.map((pokemon: Pokemon) => (
                  <Card key={pokemon.id} content={pokemon} />
                ))}
              </>
            ) : (
              <>
                {pokemons
                  .filter((pokemon) => {
                    return pokemon.types.find((type: any) => {
                      return type.type.name === selectedTypes;
                    });
                  })
                  .map((pokemon: Pokemon) => (
                    <Card key={pokemon.id} content={pokemon} />
                  ))}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default PokemonsTable;
