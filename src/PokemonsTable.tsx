import React, { ElementType, useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Tooltip,
  Select,
  SelectChangeEvent,
  FormControl,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getPokemon, generations } from "./fetcher";
import { Pokemon, PokemonData, PokemonType } from "./types/Pokemon";
import FilterType from "./components/FilterType";

type Props = { layout: ElementType };

const PokemonsTable: React.FC<Props> = ({ layout: Layout }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [gens, setGens] = useState<any>(generations[0]);
  const [selectedTypes, setSelectedTypes] = useState("");
  const [isPending, setIsPending] = useState<boolean>(true);

  const fetchData = async (gen: any) => {
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
    setIsPending(false);
  };

  const handleChangeGen = (e: SelectChangeEvent) => {
    setGens(JSON.parse(e.target.value));
  };

  const capitalize = (string: any) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSelectType = (e) => {
    console.log(e);
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
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              columnGap={2}
              rowGap={3}
              sx={{ justifySelf: "center" }}
            >
              {pokemons.map((p: Pokemon, i: number) => (
                <Grid
                  item
                  key={i}
                  sx={{
                    bgcolor: "#FFCB05",
                    border: "3px solid",
                    borderColor: "#3466AF",
                    borderRadius: 2,
                    padding: 2,
                    boxSizing: "border-box",
                    boxShadow: "0px 0px 0px 0px",
                    "&:hover": {
                      boxShadow:
                        " inset 0px 0px 10px 0px rgba(48, 106, 192, 1)",
                    },
                  }}
                >
                  {/* Detail */}
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    rowGap={1}
                    height={160}
                  >
                    <Box
                      component="img"
                      src={p.sprite}
                      alt="sprite"
                      width={110}
                    />
                    <Box>{capitalize(p.name)}</Box>
                    <Stack direction="row" columnGap={2}>
                      {p.types.map((t: PokemonType, i: number) => (
                        <Tooltip
                          arrow
                          title={capitalize(t.type.name)}
                          placement="top"
                          key={i}
                        >
                          <Box
                            component="img"
                            src={`./src/assets/icons/types/${t.type.name}.png`}
                            width={25}
                          />
                        </Tooltip>
                      ))}
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </Layout>
    </>
  );
};

export default PokemonsTable;
