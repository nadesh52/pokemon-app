import React, { ElementType, useState, useEffect } from "react";
import {
  Container,
  Stack,
  Box,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useParams } from "react-router-dom";
import { getPokemon } from "./fetcher";
import {
  Pokemon,
  PokemonSingle,
  initPokemon,
  typePokemon,
} from "./types/Pokemon";

type Props = { layout: ElementType };

const URL = "https://pokeapi.co/api/v2/pokemon/";

const firstIdx = 1;
const lastIdx = 1025;

const getHeight = (h) => {
  const m = (h * 10) / 100;
  const mToFeet = m / 0.32808;
  const inch = mToFeet / 12;
  const toStr = `${mToFeet.toFixed(0)}'0${inch.toString().substring(2, 3)}"`;
  const height = {
    meter: m.toFixed(1),
    feet: toStr,
  };
  return height;
};

const getWeight = (w) => {
  const kg = w / 10;
  const lbs = kg * 2.204;
  const weight = {
    kg: kg.toFixed(1),
    lbs: lbs.toFixed(1),
  };
  return weight;
};

const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const initColor = {
  normal: "#68A090",
  dark: "#44685E",
  light: "#9DC1B7",
};

const SinglePage: React.FC<Props> = ({ layout: Layout }) => {
  const [pokemon, setPokemon] = useState<PokemonSingle>(initPokemon);
  const [evoChain, setEvoChain] = useState([]);
  const [prevPokemon, setPrevPokemon] = useState<Pokemon>();
  const [nextPokemon, setNextPokemon] = useState<Pokemon>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [typeColor, setTypeColor] = useState(initColor);
  const { id } = useParams() as { id: string };

  const fetchData = async (pokeId: string) => {
    setIsPending(true);

    const jsonData = await getPokemon(pokeId).then((res) => res.json());

    const species = await fetch(jsonData.species.url);
    const speciesJson = await species.json();

    const getOtherName = (language: string): string => {
      const findingName = speciesJson.names
        .filter((n) => n.language.name === language)
        .map((na) => {
          return na.name;
        })
        .join("");
      return findingName;
    };

    const getGenera = (language: string): string => {
      const genera = speciesJson.genera
        .filter((g) => g.language.name === language)
        .map((ge) => {
          return ge.genus;
        })
        .join("");
      return genera;
    };

    const mon: PokemonSingle = {
      id: jsonData.id,
      name: jsonData.name,
      height: jsonData.height,
      weight: jsonData.weight,
      sprites: jsonData.sprites.other["official-artwork"]["front_default"],
      species: jsonData.species.name,
      abilities: jsonData.abilities,
      types: jsonData.types,
      stats: jsonData.stats,
      egg_groups: speciesJson.egg_groups,
      evolution_chain: speciesJson.evolution_chain,
      hatch_counter: speciesJson.hatch_counter,
      names: speciesJson.names,
      // shape: speciesJson.shape.name,
      growth_rate: speciesJson.growth_rate.name,
      genera: getGenera("en"),
      japanName: getOtherName("ja-Hrkt"),
      romanjiName: getOtherName("roomaji"),
    };
    setPokemon(mon);

    if (jsonData.id > firstIdx) {
      const prevPokeJson = await fetch(`${URL}${jsonData.id - 1}`).then((res) =>
        res.json()
      );
      setPrevPokemon(prevPokeJson);
    }

    if (jsonData.id < lastIdx) {
      const nextPokeJson = await fetch(`${URL}${jsonData.id + 1}`).then((res) =>
        res.json()
      );
      setNextPokemon(nextPokeJson);
    }

    const evoChain = await fetch(speciesJson.evolution_chain.url);
    const evoChainJson = await evoChain.json();

    if (evoChainJson.chain.evolves_to.length !== 0) {
      evoChainJson.chain.evolves_to.map(async (stage2) => {
        if (stage2.evolves_to.length !== 0) {
          stage2.evolves_to.map(async (stage3) => {
            const allChain = [];

            allChain.push(
              await fetch(`${URL}${evoChainJson.chain.species.name}`).then(
                (res) => res.json()
              ),
              await fetch(`${URL}${stage2.species.name}`).then((res) =>
                res.json()
              ),
              await fetch(`${URL}${stage3.species.name}`).then((res) =>
                res.json()
              )
            );
            setEvoChain(allChain);
          });
        } else {
          const allChain = [];
          allChain.push(
            await fetch(`${URL}${evoChainJson.chain.species.name}`).then(
              (res) => res.json()
            ),
            await fetch(`${URL}${stage2.species.name}`).then((res) =>
              res.json()
            )
          );
          setEvoChain(allChain);
        }
      });
    } else {
      const allChain = [];
      allChain.push(
        await fetch(`${URL}${evoChainJson.chain.species.name}`).then((res) =>
          res.json()
        )
      );
      setEvoChain(allChain);
    }

    for (let index = 0; index < typePokemon.length; index++) {
      const element = typePokemon[index];
      // console.log(element.name);
      if (element.name === mon.types[0].type?.name) {
        const newColor = {
          normal: element.color.normal,
          dark: element.color.dark,
          light: element.color.light,
        };
        setTypeColor(newColor);
        break;
      }
    }

    setIsPending(false);
  };

  const getTypeColor = (type: string) => {
    for (let index = 0; index < typePokemon.length; index++) {
      const element = typePokemon[index];
      if (element.name === type) {
        return element.color.normal;
      }
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  return (
    <Layout>
      <Container sx={{ padding: 0 }}>
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
            ...loading
          </Box>
        ) : (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            rowGap={3}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              width={800}
              height={120}
              columnGap={2}
              sx={{ bgcolor: typeColor.dark, borderRadius: 7 }}
            >
              {pokemon.id > firstIdx && (
                <Link
                  to={`/p/${prevPokemon?.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    width={380}
                    height={100}
                    sx={{
                      bgcolor: typeColor.normal,
                      borderRadius: 5,
                      "&:hover": { bgcolor: typeColor.light },
                    }}
                  >
                    <Box>
                      <ArrowBackIosIcon />
                    </Box>
                    <Box>#{prevPokemon?.id.toString().padStart(4, "0")}</Box>
                    <Box>{capitalize(prevPokemon?.name)}</Box>
                    <Box>
                      <Box
                        component="img"
                        src={prevPokemon?.sprites.front_default}
                        alt="prev"
                        width={100}
                      />
                    </Box>
                  </Grid>
                </Link>
              )}

              {pokemon.id < lastIdx && (
                <Link
                  to={`/p/${nextPokemon?.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    width={380}
                    height={100}
                    sx={{
                      bgcolor: typeColor.normal,
                      borderRadius: 5,
                      "&:hover": { bgcolor: typeColor.light },
                    }}
                  >
                    <Box>
                      <Box
                        component="img"
                        src={nextPokemon?.sprites.front_default}
                        alt="next"
                        width={100}
                      />
                    </Box>
                    <Box>{capitalize(nextPokemon?.name)}</Box>
                    <Box>#{nextPokemon?.id.toString().padStart(4, "0")}</Box>
                    <Box>
                      <ArrowForwardIosIcon />
                    </Box>
                  </Grid>
                </Link>
              )}
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="center"
              // alignItems="center"
              columnGap={3}
              rowGap={3}
            >
              {/* Bio panel */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                rowGap="2px"
                sx={{
                  padding: "4px",
                  width: 300,
                  bgcolor: typeColor.dark,
                  borderRadius: 3,
                }}
              >
                {/* Name and Image */}
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  height={355}
                  rowGap={1}
                  sx={{ bgcolor: typeColor.normal, borderRadius: 3 }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    columnGap={1}
                    height={50}
                    marginTop={1}
                  >
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-evenly"
                      alignItems="flex-end"
                      width="65%"
                      sx={{ bgcolor: "whitesmoke", borderRadius: 2 }}
                    >
                      <Stack direction="column">
                        <Box>
                          <Typography fontWeight="bold" fontSize={18}>
                            {capitalize(pokemon.name)}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography fontSize={11} color="darkgray">
                            {pokemon.genera}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="column">
                        <Box>
                          <Typography fontWeight="bold" fontSize={13}>
                            {pokemon.japanName}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography fontStyle="italic" fontSize={13}>
                            {pokemon.romanjiName}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent="center"
                      alignItems="center"
                      width="25%"
                      sx={{ bgcolor: "whitesmoke", borderRadius: 2 }}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          #{pokemon.id.toString().padStart(4, "0")}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    columnGap={2}
                    width={280}
                    height={280}
                    sx={{ bgcolor: "whitesmoke", borderRadius: 3 }}
                  >
                    <Grid item>
                      <Box
                        component="img"
                        src={`${pokemon.sprites}`}
                        alt="Pokemon-img"
                        width={270}
                      />
                    </Grid>
                  </Stack>
                </Grid>

                {/* Type */}
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  height={60}
                  sx={{ bgcolor: typeColor.normal, borderRadius: 3 }}
                >
                  <Box sx={{ marginTop: 0.5, marginBottom: 0.5 }}>Type</Box>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columnGap={1}
                    width={300}
                    height={30}
                    sx={{ bgcolor: "whitesmoke", borderRadius: 3 }}
                  >
                    {pokemon.types.map((t: any, i: number) => (
                      <Box
                        key={i}
                        sx={{
                          padding: 0.2,
                          bgcolor: getTypeColor(t.type.name),
                          borderRadius: 1,
                        }}
                      >
                        {capitalize(t.type.name)}
                      </Box>
                    ))}
                  </Stack>
                </Grid>

                {/* Abilities */}
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  rowGap={0.5}
                  height={90}
                  sx={{ bgcolor: typeColor.normal, borderRadius: 3 }}
                >
                  <Box>Abilities</Box>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    width={295}
                    height={55}
                    columnGap="30px"
                    textAlign="center"
                    sx={{ bgcolor: "whitesmoke", borderRadius: 3 }}
                  >
                    {pokemon.abilities.map((a: any, i: number) => (
                      <Stack direction="column" key={i}>
                        <Box>{capitalize(a.ability.name)}</Box>
                        {a.is_hidden === true && (
                          <Box>
                            <Typography fontSize={10} color="gray">
                              Hidden Ability
                            </Typography>
                          </Box>
                        )}
                      </Stack>
                    ))}
                  </Stack>
                </Grid>

                {/* Breeding */}
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  width={300}
                  height={75}
                  sx={{ bgcolor: typeColor.normal, borderRadius: 3 }}
                >
                  Breeding
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columnGap={0.5}
                    width={280}
                    height={50}
                    textAlign="center"
                  >
                    <Box width="50%">
                      <Stack direction="column">
                        <Box>Egg Groups</Box>
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          height={25}
                          sx={{ bgcolor: "whitesmoke", borderRadius: 2 }}
                        >
                          <Stack direction="row" columnGap={2}>
                            {pokemon.egg_groups.map((e, i) => (
                              <Box key={i}>
                                <Typography variant="caption">
                                  {capitalize(e.name)}
                                </Typography>
                              </Box>
                            ))}
                          </Stack>
                        </Grid>
                      </Stack>
                    </Box>
                    <Box width="50%">
                      <Stack direction="column">
                        <Box>Hatch time</Box>
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          height={25}
                          sx={{ bgcolor: "whitesmoke", borderRadius: 2 }}
                        >
                          <Typography variant="caption">
                            {pokemon.hatch_counter} cycles
                          </Typography>
                        </Grid>
                      </Stack>
                    </Box>
                  </Stack>
                </Grid>

                {/* Height and Weight */}
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    height={50}
                    width="49%"
                    sx={{ bgcolor: typeColor.normal, borderRadius: 3 }}
                  >
                    <Box>
                      <Stack direction="column">
                        <Box textAlign="center">Height</Box>
                        <Stack
                          direction="row"
                          justifyContent="space-around"
                          alignItems="center"
                          width={140}
                          height={25}
                          sx={{ bgcolor: "whitesmoke", borderRadius: 2 }}
                        >
                          <Typography variant="caption">
                            <Box>{getHeight(pokemon.height).feet}</Box>
                          </Typography>
                          <Typography variant="caption">
                            <Box>{getHeight(pokemon.height).meter} m</Box>
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    height={50}
                    width="49%"
                    sx={{ bgcolor: typeColor.normal, borderRadius: 3 }}
                  >
                    <Box>
                      <Stack direction="column">
                        <Box textAlign="center">Weight</Box>
                        <Stack
                          direction="row"
                          justifyContent="space-around"
                          alignItems="center"
                          width={140}
                          height={25}
                          sx={{ bgcolor: "whitesmoke", borderRadius: 2 }}
                        >
                          <Typography variant="caption">
                            <Box>{getWeight(pokemon.weight).lbs} lbs.</Box>
                          </Typography>
                          <Typography variant="caption">
                            <Box>{getWeight(pokemon.weight).kg} kg</Box>
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* stat panel */}
              <Box
                display="flex"
                flexDirection="column"
                rowGap="2px"
                width={400}
                sx={{
                  padding: "4px",
                  bgcolor: typeColor.dark,
                  borderRadius: 3,
                }}
              >
                <Box
                  textAlign="center"
                  sx={{
                    bgcolor: typeColor.normal,
                    borderRadius: 3,
                  }}
                >
                  <Typography variant="h5">Evolution</Typography>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    height={180}
                  >
                    {evoChain.map((e, i: number) => (
                      <Box key={i} width={100}>
                        <Grid
                          container
                          direction="column"
                          alignItems="center"
                          rowGap={2}
                        >
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            width={100}
                            height={100}
                            sx={{
                              bgcolor: "whitesmoke",
                              border: "2px solid",
                              borderColor: typeColor.dark,
                              borderRadius: 15,
                            }}
                          >
                            <Link to={`/p/${e.id}`}>
                              <Box
                                component="img"
                                src={
                                  e.sprites.other["official-artwork"][
                                    "front_default"
                                  ]
                                }
                                alt="evo-img"
                                width={90}
                              />
                            </Link>
                          </Box>
                          <Box
                            width={100}
                            height={50}
                            sx={{ bgcolor: typeColor.light, borderRadius: 2 }}
                          >
                            <Box>
                              <Typography fontSize={15}>
                                {capitalize(e.name)}
                              </Typography>
                            </Box>
                            <Box>
                              <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                columnGap="4px"
                              >
                                {e.types.map((t, i: number) => (
                                  <Box
                                    key={i}
                                    sx={{
                                      padding: "2px",
                                      bgcolor: getTypeColor(t.type.name),
                                      borderRadius: 1,
                                    }}
                                  >
                                    <Typography fontSize={12}>
                                      {capitalize(t.type.name)}
                                    </Typography>
                                  </Box>
                                ))}
                              </Stack>
                            </Box>
                          </Box>
                        </Grid>
                      </Box>
                    ))}
                  </Grid>
                </Box>

                {/* stat table */}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  height={270}
                  textAlign="center"
                  sx={{
                    bgcolor: typeColor.normal,
                    borderRadius: 3,
                  }}
                >
                  <Typography variant="h5">Status</Typography>
                  <Box
                    height={220}
                    width={380}
                    sx={{ bgcolor: "whitesmoke", borderRadius: 3 }}
                  ></Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export default SinglePage;
