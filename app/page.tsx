"use client";
import { useEffect, useState } from "react";
import logo from "@/public/assets/logos/pokeball_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faDiceThree,
} from "@fortawesome/free-solid-svg-icons";
import { getPokemon } from "../utils/fetcher";
import { padNumber } from "../utils/padNumber";
import Image from "next/image";

type NavPoke = {
  id: number;
  name: string;
  sprites: string;
};

const initNavPoke: NavPoke = {
  id: 0,
  name: "",
  sprites: "",
};

type EvoPoke = {
  id: number;
  name: string;
  sprites: string;
  types: [];
};

const initPoke = {
  id: 0,
  name: "",
  types: [],
  artwork: "",
  sprites: {
    front_default: "",
    back_default: "",
    front_shiny: "",
    back_shiny: "",
  },
  flavor_text: "",
  flavor_version: "",
};
const firstIdx = 1;
const lastIdx = 1025;

const URL = "https://pokeapi.co/api/v2/pokemon/";
const randomId = Math.floor(Math.random() * 1025).toString();

const titleStr =
  "While most Pokémon resemble animals and may behave like them,there are many that do not resemble animals at all, taking onother forms such as plants, inanimate objects, machines,human-like forms, or other more enigmatic and exoticappearances.";

const titleStr2 =
  "Pokémon inhabit an extremely diverse range of habitats,ranging from the driest deserts to the lushest jungles, thedeepest oceans to the highest mountains and everything else inbetween, even outer space and other dimensions.";

const LandingPage = () => {
  const [pokeId, setPokeId] = useState(randomId);
  const [text, setText] = useState("");
  const [pokemon, setPokemon] = useState(initPoke);
  const [evoChain, setEvoChain] = useState([]);
  const [prevPokemon, setPrevPokemon] = useState<NavPoke>(initNavPoke);
  const [nextPokemon, setNextPokemon] = useState<NavPoke>(initNavPoke);
  const [isPending, setIsPending] = useState(true);

  const fetchData = async (pokeId: string) => {
    if (pokeId !== "") {
      setIsPending(true);
      const res = await getPokemon(pokeId);
      const jsonData = await res.json();

      const resSpecies = await fetch(jsonData.species.url);
      const jsonSpecies = await resSpecies.json();

      const getName = (): string => {
        const findingName = jsonSpecies.names
          .filter((n: any) => n.language.name === "en")
          .map((na: any) => {
            return na.name;
          })
          .join("");
        return findingName;
      };

      const getRandomFavorText = () => {
        const f = jsonSpecies.flavor_text_entries
          .filter((n: any) => n.language.name === "en")
          .map((m: any) => {
            return m;
          });

        const randomPick = f[Math.floor(Math.random() * f.length)];
        return randomPick;
      };

      const poke = {
        id: jsonData.id,
        name: getName(),
        sprites: jsonData.sprites,
        artwork: jsonData.sprites.other["official-artwork"]["front_default"],
        types: jsonData.types,
        flavor_text: getRandomFavorText().flavor_text,
        flavor_version: getRandomFavorText().version.name,
      };
      setPokemon(poke);

      // evo chain //

      const evoChain = await fetch(jsonSpecies.evolution_chain.url);
      const evoChainJson = await evoChain.json();

      if (evoChainJson.chain.evolves_to.length !== 0) {
        evoChainJson.chain.evolves_to.map(async (stage2: any) => {
          if (stage2.evolves_to.length !== 0) {
            stage2.evolves_to.map(async (stage3: any) => {
              const allChain: any = [];

              const res1 = await fetch(
                `${URL}${evoChainJson.chain.species.name}`
              );
              const json1 = await res1.json();

              const res2 = await fetch(`${URL}${stage2.species.name}`);
              const json2 = await res2.json();

              const res3 = await fetch(`${URL}${stage3.species.name}`);
              const json3 = await res3.json();

              const s1: EvoPoke = {
                id: json1.id,
                name: json1.name,
                sprites:
                  json1.sprites.other["official-artwork"]["front_default"],
                types: json1.types,
              };

              const s2: EvoPoke = {
                id: json2.id,
                name: json2.name,
                sprites:
                  json2.sprites.other["official-artwork"]["front_default"],
                types: json2.types,
              };

              const s3: EvoPoke = {
                id: json3.id,
                name: json3.name,
                sprites:
                  json3.sprites.other["official-artwork"]["front_default"],
                types: json3.types,
              };

              allChain.push(s1, s2, s3);
              return setEvoChain(allChain);
            });
          } else {
            const allChain: any = [];

            if (evoChainJson.id === 348) {
              const maleName = "meowstic-male";
              const femaleName = "meowstic-female";

              const resMale = await fetch(`${URL}${maleName}`);
              const jsonMale = await resMale.json();

              const resFemale = await fetch(`${URL}${femaleName}`);
              const jsonFemale = await resFemale.json();

              const sMale: EvoPoke = {
                id: jsonMale.id,
                name: jsonMale.name,
                sprites:
                  jsonMale.sprites.other["official-artwork"]["front_default"],
                types: jsonMale.types,
              };

              const sFemale: EvoPoke = {
                id: jsonFemale.id,
                name: jsonFemale.name,
                sprites:
                  jsonFemale.sprites.other["official-artwork"]["front_default"],
                types: jsonFemale.types,
              };

              allChain.push(sMale, sFemale);
              return setEvoChain(allChain);
            } else {
              const res1 = await fetch(
                `${URL}${evoChainJson.chain.species.name}`
              );
              const json1 = await res1.json();

              const res2 = await fetch(`${URL}${stage2.species.name}`);
              const json2 = await res2.json();

              const s1: EvoPoke = {
                id: json1.id,
                name: json1.name,
                sprites:
                  json1.sprites.other["official-artwork"]["front_default"],
                types: json1.types,
              };

              const s2: EvoPoke = {
                id: json2.id,
                name: json2.name,
                sprites:
                  json2.sprites.other["official-artwork"]["front_default"],
                types: json2.types,
              };
              allChain.push(s1, s2);
              return setEvoChain(allChain);
            }
          }
        });
      } else {
        const allChain: any = [];

        const res = await fetch(`${URL}${evoChainJson.chain.species.name}`);
        const json1 = await res.json();

        const s1: EvoPoke = {
          id: json1.id,
          name: json1.name,
          sprites: json1.sprites.other["official-artwork"]["front_default"],
          types: json1.types,
        };

        allChain.push(s1);

        return setEvoChain(allChain);
      }

      // prev and next poke //

      if (jsonData.id > firstIdx) {
        const prevData = await fetch(`${URL}${jsonData.id - 1}`);
        const prevPokeJson = await prevData.json();

        const prevP: NavPoke = {
          id: prevPokeJson.id,
          name: prevPokeJson.name,
          sprites:
            prevPokeJson.sprites["other"]["official-artwork"]["front_default"],
        };

        setPrevPokemon(prevP);
      }

      if (jsonData.id < lastIdx) {
        const nextData = await fetch(`${URL}${jsonData.id + 1}`);
        const nextPokeJson = await nextData.json();

        const nextP: NavPoke = {
          id: nextPokeJson.id,
          name: nextPokeJson.name,
          sprites:
            nextPokeJson.sprites["other"]["official-artwork"]["front_default"],
        };
        setNextPokemon(nextP);
      }

      setIsPending(false);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    setPokeId(text);
    setText("");
  };

  const onRandom = (e: any) => {
    e.preventDefault();
    const rand = Math.floor(Math.random() * 1025);
    setPokeId(rand.toString());
  };

  useEffect(() => {
    fetchData(pokeId);
  }, [pokeId]);

  return (
    <article>
      <nav className="flex justify-between items-center bg-accent px-4 py-2">
        <div className="flex items-center gap-4">
          <a href="/">
            <Image src={logo} alt="" height={40} width={40} />
          </a>

          <form className="flex items-center gap-1" onSubmit={onSubmit}>
            <label>
              <input
                name="input"
                onChange={(e: any) => setText(e.target.value)}
                value={text}
                type="number"
                autoComplete="off"
                placeholder="Search by number, Try me"
                className="h-8 rounded px-2 bg-base"
              />
            </label>

            <button className="text-secondary hover:rotate-180 duration-200 ml-1">
              <FontAwesomeIcon
                name="rand"
                onClick={onRandom}
                icon={faDiceThree}
                size="2xl"
              />
            </button>
          </form>
        </div>

        <ul className="flex items-center gap-3">
          <li>
            <a href="/p" className="__menu-link">
              <span>table</span>
            </a>
          </li>
          <li>
            <a href="#" className="__menu-link">
              <span>link 1</span>
            </a>
          </li>
          <li>
            <a href="#" className="__menu-link">
              <span>link 2</span>
            </a>
          </li>
        </ul>
      </nav>

      {isPending ? (
        <div className="text-center text-secondary text-lg font-medium">
          <span>choosing you pokemon...</span>
        </div>
      ) : (
        <>
          <section className="w-full px-4">
            <div className="grid grid-cols-2">
              <div className="content-center justify-self-center mx-24">
                <span className="text-4xl text-secondary font-medium">
                  {pokemon.name}
                </span>
                <div className="flex items-center gap-4">
                  <span className="bg-black text-white w-fit text-lg tracking-wider font-medium py-1 px-3 rounded">
                    #{padNumber(pokemon.id)}
                  </span>
                  {pokemon.types.map((t: any, i: number) => (
                    <div key={i} className="__type" id={t.type.name}>
                      {t.type.name}
                    </div>
                  ))}
                </div>
                <span className="__sub-title">{pokemon.flavor_text}</span>
                <span className="__sub-title --self-center">
                  pokemon {pokemon.flavor_version}
                </span>

                <div className="flex justify-evenly items-center gap-4">
                  <Image
                    src={pokemon.sprites.front_default}
                    alt=""
                    height={60}
                    width={60}
                  />
                  <Image
                    src={pokemon.sprites.back_default}
                    alt=""
                    height={60}
                    width={60}
                  />
                  <Image
                    src={pokemon.sprites.front_shiny}
                    alt=""
                    height={60}
                    width={60}
                  />
                  <Image
                    src={pokemon.sprites.back_shiny}
                    alt=""
                    height={60}
                    width={60}
                  />
                </div>
              </div>

              <div className="content-center justify-self-center">
                <Image
                  className="__artwork"
                  src={pokemon.artwork}
                  alt=""
                  height={300}
                  width={300}
                />
              </div>
            </div>
          </section>

          {/* main */}

          <section>
            <div className="bg-primary p-4">
              <span className="text-2xl text-white font-medium">
                Evolution Chain
              </span>

              <div className="flex justify-evenly items-center mt-2">
                {evoChain.map((evo: any, i: number) => (
                  <button key={i} onClick={() => setPokeId(evo.id)}>
                    <div className="hover:bg-white p-2 rounded-md transition-all group">
                      <Image
                        src={evo.sprites}
                        alt="evo-stage"
                        height={100}
                        width={100}
                        className="group-hover:scale-150 transition-all"
                      />
                      <div className="flex justify-evenly items-center">
                        {evo.types.map((m: any, i: number) => (
                          <span key={i}>{m.type.name}</span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 px-4 my-4">
              <div className="content-center justify-self-center">
                <Image
                  src="https://archives.bulbagarden.net/media/upload/thumb/a/a7/PSMD_poster.png/250px-PSMD_poster.png"
                  alt=""
                  height={200}
                  width={200}
                />
              </div>

              <div className="flex flex-col gap-4">
                <p className="indent-8">{titleStr}</p>
                <p className="indent-8">{titleStr2}</p>
                <a
                  className="bg-secondary w-fit py-2 px-3 rounded-md text-white text-lg font-josefin font-medium"
                  href="/table"
                >
                  Discover More
                </a>
              </div>
            </div>
          </section>

          {/* end main */}

          {/* prev next */}

          <section className="bg-accent flex items-center justify-evenly">
            {pokemon.id > firstIdx && (
              <a
                className="flex items-center cursor-pointer"
                onClick={() => setPokeId(prevPokemon.id.toString())}
              >
                <FontAwesomeIcon icon={faArrowLeftLong} size="xl" />
                <Image
                  src={prevPokemon.sprites}
                  alt=""
                  height={80}
                  width={80}
                />
              </a>
            )}

            {pokemon.id < lastIdx && (
              <a
                className="flex items-center cursor-pointer"
                onClick={() => setPokeId(nextPokemon.id.toString())}
              >
                <Image
                  src={nextPokemon.sprites}
                  alt=""
                  height={80}
                  width={80}
                />
                <FontAwesomeIcon icon={faArrowRightLong} size="xl" />
              </a>
            )}
          </section>
        </>
      )}
    </article>
  );
};

export default LandingPage;
