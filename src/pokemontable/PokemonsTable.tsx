import { FC, ElementType, useState, useEffect } from "react";
import { Container, CircularProgress } from "@mui/material";
import { getPokemons, generations, Generation } from "../utils/fetcher";
import { Pokemon, PokemonData } from "../types/pokemon";
import FilterType from "../components/filtertype/FilterType";
import Card from "../components/card/Card";
import GenSelection from "../components/genselection/GenSelection";
import "./PokemonsTable.css";

type Props = { layout: ElementType };

const PokemonsTable: FC<Props> = ({ layout: Layout }) => {
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

  const handleChangeGen = (e: any) => {
    setGens(JSON.parse(e));
  };

  const handleSelectType = (e: string) => {
    setSelectedTypes(e);
  };

  useEffect(() => {
    fetchData(gens);
  }, [gens]);

  return (
    <Layout>
      {isPending ? (
        <div className="__table--loading">
          <CircularProgress />
          ...loading
        </div>
      ) : (
        <Container maxWidth="md">
          <div className="__table__input">
            <GenSelection selectedGen={handleChangeGen} />
            <FilterType selectedType={handleSelectType} />
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
        </Container>
      )}
    </Layout>
  );
};

export default PokemonsTable;
