"use client";
import { useEffect, useState } from "react";
import logo from "@/public/assets/logos/pokeball_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceThree } from "@fortawesome/free-solid-svg-icons";
import { padNumber } from "../utils/padNumber";
import { randomNumber } from "@/utils/randomNumber";
import Image from "next/image";
import LoadingBlock from "@/components/LoadingBlock";
import { nextPoke, prevPoke } from "@/utils/navPoke";
import NavPokemon from "@/components/NavPokemon";
import EvoCard from "@/components/EvoCard";

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
  const [inputText, setInputText] = useState("");
  const [pokemon, setPokemon] = useState(initPoke);
  const [evoChain, setEvoChain] = useState([]);
  const [prevPokemon, setPrevPokemon] = useState<NavPoke>(initNavPoke);
  const [nextPokemon, setNextPokemon] = useState<NavPoke>(initNavPoke);
  const [isPending, setIsPending] = useState(true);
  const [theme, setTheme] = useState("");

  const fetchData = async (pokeId: string) => {
    try {
      setIsPending(true);
      const res = await fetch(`${URL}/${pokeId}`);
      const jsonData = await res.json();

      const newTheme = `theme-${jsonData.types[0].type.name}`;
      console.log(newTheme);
      setTheme(newTheme);

      const resSpecies = await fetch(jsonData.species.url);
      const jsonSpecies = await resSpecies.json();

      const getName = (name: any): string => {
        const findingName = name
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
        name: getName(jsonSpecies.names),
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
        setPrevPokemon(await prevPoke(jsonData.id));
      }

      if (jsonData.id < lastIdx) {
        setNextPokemon(await nextPoke(jsonData.id));
      }

      setIsPending(false);
    } catch (error) {
      throw error;
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    setPokeId(inputText);
    setInputText("");
  };

  useEffect(() => {
    fetchData(pokeId);
  }, [pokeId, theme]);

  return (
    <article>
      <nav className="flex justify-between items-center bg-skin-fill px-4 py-2">
        <div className="flex items-center gap-4">
          <a href="/">
            <Image src={logo} alt="" height={40} width={40} />
          </a>

          <button
            className="text-skin-base hover:rotate-180 duration-200 ml-1"
            onClick={(e) => setPokeId(randomNumber(e))}
          >
            <FontAwesomeIcon name="rand" icon={faDiceThree} size="2xl" />
          </button>
        </div>

        <ul className="flex items-center gap-3 text-skin-base">
          <li>
            <a href="/pokemon" className="__menu-link">
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
        <LoadingBlock />
      ) : (
        <div className={`${theme}`}>
          <section className="w-full px-4">
            <div className="max-w-sm my-10 mx-auto">
              <div>
                <p className="text-center text-4xl text-secondary font-josefin font-medium">
                  Random landing page by Pokemon identity
                </p>
                <p className="text-center text-type-ghost-normal">
                  try it now!
                </p>
              </div>

              <form onSubmit={onSubmit} className="my-2">
                <label>
                  <input
                    onChange={(e: any) => setInputText(e.target.value)}
                    value={inputText}
                    type="number"
                    autoComplete="off"
                    placeholder="Enter Pokemon number"
                    className="h-11 rounded-xl shadow-lg w-full px-4 outline-none ring-1 ring-opacity-40 ring-secondary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
                  />
                </label>
              </form>
            </div>

            <div className="grid grid-cols-2">
              <div className="content-center justify-self-center">
                <span className="text-4xl text-skin-type font-josefin font-medium">
                  {pokemon.name}
                </span>

                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-skin-black text-skin-base w-fit tracking-wider font-josefin font-medium py-1 px-3 rounded">
                    #{padNumber(pokemon.id)}
                  </span>
                  {pokemon.types.map((t: any, i: number) => (
                    <span
                      key={i}
                      className="bg-skin-fill text-skin-base w-fit py-1 px-2 rounded font-josefin"
                      id={t.type.name}
                    >
                      {t.type.name}
                    </span>
                  ))}
                </div>
                <p className="text-lg font-josefin indent-8">
                  {pokemon.flavor_text}
                </p>
                <p className="font-josefin text-right font-medium">
                  pokemon {pokemon.flavor_version}
                </p>

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
                <Image src={pokemon.artwork} alt="" height={250} width={250} />
              </div>
            </div>
          </section>

          {/* main */}

          <section>
            <div className="bg-skin-fill-light p-4">
              <span className="text-2xl text-skin-base font-medium font-josefin">
                Evolution Chain
              </span>

              <div className="flex justify-evenly items-center mt-2">
                {evoChain.map((evo: any, i: number) => (
                  <EvoCard
                    key={i}
                    evo={evo}
                    onClick={() => setPokeId(evo.id)}
                  />
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
                  className="bg-skin-button-accent w-fit py-2 px-3 rounded-md text-white text-skin-base text-lg font-josefin font-medium hover:bg-skin-button-accent-hover"
                  href="/table"
                >
                  Discover More
                </a>
              </div>
            </div>
          </section>

          {/* end main */}

          {/* prev next */}
          <NavPokemon
            pokemon={pokemon}
            prevPokemon={prevPokemon}
            nextPokemon={nextPokemon}
            nextClick={() => setPokeId(nextPokemon.id.toString())}
            prevClick={() => setPokeId(prevPokemon.id.toString())}
          />
        </div>
      )}
    </article>
  );
};
export default LandingPage;
