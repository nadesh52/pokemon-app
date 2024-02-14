import React, { ElementType, useState, useEffect } from "react";
import { Stack, Box, Grid, CircularProgress } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useParams } from "react-router-dom";
import { getPokemon } from "./utils/fetcher";
import {
  Pokemon,
  PokemonSingle,
  initPokemon,
  typePokemon,
} from "./types/pokemon";

type Props = { layout: ElementType };

const URL = "https://pokeapi.co/api/v2/pokemon/";

const firstIdx = 1;
const lastIdx = 1025;

const getHeight = (h: number) => {
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

const getWeight = (w: number) => {
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

    // const typeDiff = jsonData.types.map(async (t) => {
    //   const typeJson = await fetch(t.type.url).then((res) => res.json());
    //   console.log(typeJson);
    // });

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
      {isPending ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          marginTop={20}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          rowGap={2}
          columnGap="20px"
          xs
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
                width={440}
                height={100}
                sx={{
                  bgcolor: typeColor.normal,
                  borderRadius: "20px",
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
                width={440}
                height={100}
                sx={{
                  bgcolor: typeColor.normal,
                  borderRadius: "20px",
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

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            columnGap="20px"
            rowGap="20px"
          >
            {/* Bio panel */}
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              width={450}
              rowGap="5px"
              sx={{
                padding: "10px",
                bgcolor: typeColor.dark,
                borderRadius: "30px",
              }}
            >
              {/* Name and Image */}
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                height={350}
                sx={{ bgcolor: typeColor.normal, borderRadius: "20px" }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  columnGap="10px"
                  height="80px"
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    width="295px"
                    height="60px"
                    sx={{ bgcolor: "whitesmoke", borderRadius: "15px" }}
                  >
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      width="145px"
                    >
                      <Box sx={{ fontSize: 30, fontWeight: "bold" }}>
                        {capitalize(pokemon.name)}
                      </Box>
                      <Box sx={{ fontSize: 14, color: "gray" }}>
                        {pokemon.genera}
                      </Box>
                    </Grid>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      width="145px"
                    >
                      <Box sx={{ fontSize: 14, fontWeight: "bold" }}>
                        {pokemon.japanName}
                      </Box>
                      <Box sx={{ fontSize: 14, fontStyle: "italic" }}>
                        {pokemon.romanjiName}
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    width="95px"
                    height="60px"
                    sx={{ bgcolor: "whitesmoke", borderRadius: "15px" }}
                  >
                    <Box sx={{ fontSize: 30 }}>
                      #{pokemon.id.toString().padStart(4, "0")}
                    </Box>
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  width={400}
                  height={250}
                  sx={{ bgcolor: "whitesmoke", borderRadius: "15px" }}
                >
                  <Box
                    component="img"
                    src={`${pokemon.sprites}`}
                    alt="Pokemon-img"
                    width={250}
                  />
                </Grid>
              </Grid>

              {/* Type */}
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                height={80}
                sx={{ bgcolor: typeColor.normal, borderRadius: "20px" }}
              >
                <Box>Type</Box>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  columnGap="30px"
                  width={400}
                  height={45}
                  sx={{ bgcolor: "whitesmoke", borderRadius: "15px" }}
                >
                  {pokemon.types.map((t: any, i: number) => (
                    <Box
                      key={i}
                      sx={{
                        padding: "4px",
                        bgcolor: getTypeColor(t.type.name),
                        borderRadius: 1,
                        fontSize: 16,
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
                height={85}
                sx={{ bgcolor: typeColor.normal, borderRadius: "20px" }}
              >
                <Box>Abilities</Box>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  width={400}
                  height={50}
                  columnGap="50px"
                  sx={{ bgcolor: "whitesmoke", borderRadius: "15px" }}
                >
                  {pokemon.abilities.map((a: any, i: number) => (
                    <Stack direction="column" key={i}>
                      <Box sx={{ fontSize: 16 }}>
                        {capitalize(a.ability.name)}
                      </Box>
                      {a.is_hidden === true && (
                        <Box sx={{ fontSize: 10, color: "gray" }}>
                          Hidden Ability
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
                width={430}
                height={75}
                sx={{ bgcolor: typeColor.normal, borderRadius: "20px" }}
              >
                <Box>Breeding</Box>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  textAlign="center"
                >
                  <Stack direction="column">
                    <Box>Egg Groups</Box>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      width={180}
                      height={30}
                      sx={{ bgcolor: "whitesmoke", borderRadius: "15px" }}
                    >
                      <Stack direction="row" columnGap={2}>
                        {pokemon.egg_groups.map((e, i) => (
                          <Box key={i} sx={{ fontSize: 14 }}>
                            {capitalize(e.name)}
                          </Box>
                        ))}
                      </Stack>
                    </Grid>
                  </Stack>

                  <Stack direction="column">
                    <Box>Hatch time</Box>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      width={180}
                      height={30}
                      sx={{ bgcolor: "whitesmoke", borderRadius: "15px" }}
                    >
                      <Box sx={{ fontSize: 14 }}>
                        {pokemon.hatch_counter} cycles
                      </Box>
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>

              {/* Height and Weight */}
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                columnGap="10px"
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  height="60px"
                  width="210px"
                  sx={{ bgcolor: typeColor.normal, borderRadius: "20px" }}
                >
                  <Box>
                    <Stack direction="column">
                      <Box textAlign="center">Height</Box>
                      <Stack
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        width="180px"
                        height="30px"
                        sx={{ bgcolor: "whitesmoke", borderRadius: "15px" }}
                      >
                        <Box sx={{ fontSize: 14 }}>
                          {getHeight(pokemon.height).feet}
                        </Box>
                        <Box sx={{ fontSize: 14 }}>
                          {getHeight(pokemon.height).meter} m
                        </Box>
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>

                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  height="60px"
                  width="210px"
                  sx={{ bgcolor: typeColor.normal, borderRadius: "20px" }}
                >
                  <Box>
                    <Stack direction="column">
                      <Box textAlign="center">Weight</Box>
                      <Stack
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                        width="180px"
                        height="30px"
                        sx={{ bgcolor: "whitesmoke", borderRadius: "15px" }}
                      >
                        <Box sx={{ fontSize: 14 }}>
                          {getWeight(pokemon.weight).lbs} lbs.
                        </Box>
                        <Box sx={{ fontSize: 14 }}>
                          {getWeight(pokemon.weight).kg} kg
                        </Box>
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* stat panel */}
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              rowGap="5px"
              width={450}
              // height={690}
              sx={{
                padding: "10px",
                bgcolor: typeColor.dark,
                borderRadius: "30px",
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                height={220}
                sx={{
                  bgcolor: typeColor.normal,
                  borderRadius: "20px",
                }}
              >
                <Box sx={{ fontSize: 20 }}>Evolution</Box>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                  height={180}
                >
                  {evoChain.map((e, i: number) => (
                    <Grid
                      key={i}
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      width={120}
                      rowGap="5px"
                    >
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        width={120}
                        height={120}
                        sx={{
                          bgcolor: typeColor.light,
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
                      </Grid>
                      <Box sx={{ fontSize: 14 }}>{capitalize(e.name)}</Box>
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        width={120}
                        height={30}
                        sx={{ bgcolor: "whitesmoke", borderRadius: "15px" }}
                      >
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-evenly"
                          alignItems="center"
                        >
                          {e.types.map((t: any, i: number) => (
                            <Box
                              key={i}
                              sx={{
                                padding: "4px",
                                bgcolor: getTypeColor(t.type.name),
                                borderRadius: "15px",
                              }}
                            >
                              <Box sx={{ fontSize: 14 }}>
                                {capitalize(t.type.name)}
                              </Box>
                            </Box>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              {/* stat table */}
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                height={130}
                textAlign="center"
                sx={{
                  bgcolor: typeColor.normal,
                  borderRadius: "20px",
                }}
              >
                <Box sx={{ fontSize: 30 }}>Status</Box>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  width={400}
                  height={80}
                  sx={{ bgcolor: "whitesmoke", borderRadius: "15px" }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    columnGap="5px"
                  >
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      width={60}
                      height={60}
                      rowGap="10px"
                      sx={{ bgcolor: "#BF3131", borderRadius: "10px" }}
                    >
                      <Box sx={{ fontSize: 20 }}>
                        {pokemon.stats[0].base_stat}
                      </Box>
                      <Box>Hp</Box>
                    </Grid>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      width={60}
                      height={60}
                      rowGap="10px"
                      sx={{ bgcolor: "#FFA732", borderRadius: "10px" }}
                    >
                      <Box sx={{ fontSize: 20 }}>
                        {pokemon.stats[1].base_stat}
                      </Box>
                      <Box>Atk</Box>
                    </Grid>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      width={60}
                      height={60}
                      rowGap="10px"
                      sx={{ bgcolor: "#F4F27E", borderRadius: "10px" }}
                    >
                      <Box sx={{ fontSize: 20 }}>
                        {pokemon.stats[2].base_stat}
                      </Box>
                      <Box>Def</Box>
                    </Grid>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      width={60}
                      height={60}
                      rowGap="10px"
                      sx={{ bgcolor: "#3081D0", borderRadius: "10px" }}
                    >
                      <Box sx={{ fontSize: 20 }}>
                        {pokemon.stats[3].base_stat}
                      </Box>
                      <Box>Sp.Atk</Box>
                    </Grid>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      width={60}
                      height={60}
                      rowGap="10px"
                      sx={{ bgcolor: "#508D69", borderRadius: "10px" }}
                    >
                      <Box sx={{ fontSize: 20 }}>
                        {pokemon.stats[4].base_stat}
                      </Box>
                      <Box>Sp.Def</Box>
                    </Grid>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      width={60}
                      height={60}
                      rowGap="10px"
                      sx={{ bgcolor: "#FFC7C7", borderRadius: "10px" }}
                    >
                      <Box sx={{ fontSize: 20 }}>
                        {pokemon.stats[5].base_stat}
                      </Box>
                      <Box>Speed</Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default SinglePage;
