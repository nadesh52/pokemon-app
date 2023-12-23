import React, { ElementType, useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Select,
  SelectChangeEvent,
  FormControl,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getPokemon, generations, Generation } from "./fetcher";
import { Pokemon, PokemonData } from "./types/Pokemon";
import FilterType from "./components/FilterType";
import GridView from "./components/GridView";

type Props = { layout: ElementType };

const PokemonsTable: React.FC<Props> = ({ layout: Layout }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [gens, setGens] = useState<Generation>(generations[0]);
  const [selectedTypes, setSelectedTypes] = useState<string>("all");
  const [isPending, setIsPending] = useState<boolean>(true);

  const fetchData = async (gen: Generation) => {
    setIsPending(true);

    const jsonData = await getPokemon(gen.offset, gen.limit).then((res) =>
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

  const handleChangeGen = (e: SelectChangeEvent) => {
    setGens(JSON.parse(e.target.value));
  };

  const handleSelectType = (e: string) => {
    setSelectedTypes(e);
  };

  useEffect(() => {
    fetchData(gens);
  }, [gens]);

  return (
    <>
      <Layout>
        {isPending ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            rowGap={4}
            marginTop={20}
          >
            <CircularProgress />
            ...loading{" "}
          </Box>
        ) : (
          <Container maxWidth="xl">
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <FormControl>
                <Select
                  size="small"
                  defaultValue=""
                  onChange={(e) => handleChangeGen(e)}
                  sx={{
                    marginTop: 4,
                    width: 200,
                  }}
                >
                  {generations.map((g, i) => (
                    <MenuItem
                      key={i}
                      value={JSON.stringify({
                        id: g.id,
                        region: g.region,
                        name: g.name,
                        offset: g.offset,
                        limit: g.limit,
                      })}
                    >
                      {g.name} ({g.region})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box>
                <FilterType selectedType={handleSelectType} />
              </Box>
            </Stack>
            <Box>
              <Typography variant="h4" color="#3466AF">
                {gens.region.toUpperCase()}
              </Typography>
            </Box>
            {selectedTypes === "all" ? (
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                columnGap={2}
                rowGap={3}
                sx={{ justifySelf: "center" }}
              >
                {pokemons.map((p: Pokemon) => (
                  <GridView
                    key={p.id}
                    pokemonName={p.name}
                    pokemonSprite={p.sprite}
                    pokemonType={p.types}
                  />
                ))}
              </Grid>
            ) : (
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                columnGap={2}
                rowGap={3}
                sx={{ justifySelf: "center" }}
              >
                {pokemons
                  .filter((p) => {
                    return p.types.find((t) => {
                      return t.type.name === selectedTypes;
                    });
                  })
                  .map((p: Pokemon) => (
                    <GridView
                      key={p.id}
                      pokemonName={p.name}
                      pokemonSprite={p.sprite}
                      pokemonType={p.types}
                    />
                  ))}
              </Grid>
            )}
          </Container>
        )}
      </Layout>
    </>
  );
};

export default PokemonsTable;
