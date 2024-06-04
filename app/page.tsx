"use client";
import { useEffect, useState } from "react";
import logo from "@/public/assets/logos/pokeball_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceThree } from "@fortawesome/free-solid-svg-icons";
import { padNumber } from "../utils/padNumber";
import { randomNumber } from "@/utils/randomNumber";
import Image from "next/image";
import LoadingBlock from "@/components/LoadingBlock";
import NavPokemon from "@/components/NavPokemon";
import EvoChain from "@/components/EvoChain";
import getTheme from "@/utils/getTheme";
import getRandomFavor from "@/utils/getRandomFavor";
import getPokemonName from "@/utils/getPokemonName";
import DiscoverButton from "@/components/DiscoverButton";

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

const URL = "https://pokeapi.co/api/v2/pokemon/";

const titleStr =
  "While most Pokémon resemble animals and may behave like them,there are many that do not resemble animals at all, taking onother forms such as plants, inanimate objects, machines,human-like forms, or other more enigmatic and exoticappearances.";

const titleStr2 =
  "Pokémon inhabit an extremely diverse range of habitats,ranging from the driest deserts to the lushest jungles, thedeepest oceans to the highest mountains and everything else inbetween, even outer space and other dimensions.";

const LandingPage = () => {
  const [pokeId, setPokeId] = useState(randomNumber);
  const [pokemon, setPokemon] = useState(initPoke);
  const [evoData, setEvoData] = useState();
  const [inputText, setInputText] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [theme, setTheme] = useState("");

  const fetchData = async (pokeId: string) => {
    try {
      setIsPending(true);
      const res = await fetch(`${URL}/${pokeId}`);
      const jsonData = await res.json();

      const resSpecies = await fetch(jsonData.species.url);
      const jsonSpecies = await resSpecies.json();

      const pokemonName = getPokemonName(jsonSpecies.names);
      const flavorText = getRandomFavor(jsonSpecies);

      const poke = {
        id: jsonData.id,
        name: pokemonName,
        sprites: jsonData.sprites,
        artwork: jsonData.sprites.other["official-artwork"]["front_default"],
        types: jsonData.types,
        flavor_text: flavorText.flavor_text,
        flavor_version: flavorText.version.name,
      };

      setTheme(getTheme(jsonData));
      setEvoData(jsonSpecies);
      setPokemon(poke);
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
  }, [pokeId]);

  return (
    <article className={`${theme}`}>
      <nav className="flex justify-between items-center bg-skin-fill px-4 py-2">
        <div className="flex items-center gap-4">
          <a href="/">
            <Image src={logo} alt="" height={40} width={40} />
          </a>

          <button
            className="text-skin-base hover:rotate-180 duration-200 ml-1"
            onClick={() => setPokeId(randomNumber)}
          >
            <FontAwesomeIcon name="rand" icon={faDiceThree} size="2xl" />
          </button>
        </div>

        <ul className="flex items-center gap-3 text-skin-base">
          <li>
            <a href="/pokemon-app/pokemon">
              <span>table</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>link 1</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span>link 2</span>
            </a>
          </li>
        </ul>
      </nav>

      {isPending ? (
        <LoadingBlock />
      ) : (
        <div>
          <section className="w-full px-4">
            <div className="max-w-sm my-10 mx-auto">
              <div>
                <p className="text-center text-4xl text-skin-type font-josefin font-medium">
                  Random landing page by Pokemon identity
                </p>
                <p className="text-center text-skin-type">try it now!</p>
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
                  <span className="bg-skin-black text-skin-base w-fit tracking-wider font-josefin font-medium pt-2 pb-1 px-3 rounded">
                    #{padNumber(pokemon.id)}
                  </span>
                  {pokemon.types.map((t: any, i: number) => (
                    <span
                      key={i}
                      className="bg-skin-fill text-skin-base w-fit pt-2 pb-1 px-2 rounded font-josefin"
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
                    src={
                      pokemon.sprites.front_default
                        ? pokemon.sprites.front_default
                        : logo
                    }
                    alt=""
                    height={60}
                    width={60}
                  />
                  <Image
                    src={
                      pokemon.sprites.back_default
                        ? pokemon.sprites.back_default
                        : logo
                    }
                    alt=""
                    height={60}
                    width={60}
                  />
                  <Image
                    src={
                      pokemon.sprites.front_shiny
                        ? pokemon.sprites.front_shiny
                        : logo
                    }
                    alt=""
                    height={60}
                    width={60}
                  />
                  <Image
                    src={
                      pokemon.sprites.back_shiny
                        ? pokemon.sprites.back_shiny
                        : logo
                    }
                    alt=""
                    height={60}
                    width={60}
                  />
                </div>
              </div>

              <div className="content-center justify-self-center">
                <Image
                  src={pokemon.artwork ? pokemon.artwork : logo}
                  alt=""
                  height={250}
                  width={250}
                />
              </div>
            </div>
          </section>

          <section>
            <EvoChain
              speciesData={evoData}
              onEvoClick={(e: any) => setPokeId(e)}
            />

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
                <DiscoverButton />
              </div>
            </div>
          </section>

          <NavPokemon pokemon={pokemon} onNewNav={(e: any) => setPokeId(e)} />
        </div>
      )}
    </article>
  );
};
export default LandingPage;
