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

  const onEvoClick = (e: any) => {
    setPokeId(e.toString());
  };

  useEffect(() => {
    fetchData(pokeId);
  }, [pokeId]);

  return (
    <article>
      <nav className="__nav __nav-row --flex-row --center">
        <div className="__search-box --flex-row --center">
          <a href="/">
            <Image
              className="__logo"
              src={logo}
              alt=""
              height={40}
              width={40}
            />
          </a>
          <form className="--flex-row" onSubmit={onSubmit}>
            <input
              name="input"
              onChange={(e: any) => setText(e.target.value)}
              value={text}
              className="__search"
              type="number"
              autoComplete="off"
              placeholder="Search by number, Try me"
            />
            <FontAwesomeIcon
              name="rand"
              onClick={onRandom}
              className="__random-icon"
              icon={faDiceThree}
              size="xl"
            />
          </form>
        </div>
        <div className="__nav-menu --flex-row">
          <a href="/p" className="__menu-link">
            <span>table</span>
          </a>
          <span className="__menu-link">menu2</span>
          <span className="__menu-link">menu3</span>
        </div>
      </nav>

      {isPending ? (
        <div className="__loading">choosing you pokemon...</div>
      ) : (
        <>
          <section className="__header-container">
            <div className="__container --margin-btm">
              <div className="__inner-container --flex-col">
                <span className="__title">{pokemon.name}</span>
                <div className="__type-container --flex-row">
                  <div id="__number">#{padNumber(pokemon.id)}</div>
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
                <div className="__var --flex-row">
                  <img src={pokemon.sprites.front_default} />
                  <img src={pokemon.sprites.back_default} />
                  <img src={pokemon.sprites.front_shiny} />
                  <img src={pokemon.sprites.back_shiny} />
                </div>
              </div>
              <div className="__inner-container">
                <div className="__flex">
                  <img className="__artwork" src={pokemon.artwork} />
                </div>
              </div>
            </div>
          </section>

          {/* main */}

          <section className="__main-container">
            <div className="__main-top">
              <div className="__evo-title">Evolution Chain</div>
              <div className="--flex-row --justify-around">
                {evoChain.map((evo: any, i: number) => (
                  <div key={i} onClick={() => onEvoClick(evo.id)}>
                    <div className="__evo-img-bg">
                      <img
                        className="__evo-img"
                        src={evo.sprites}
                        alt="evo-stage"
                      />
                    </div>
                    <div className="--flex-row --justify-around">
                      {evo.types.map((m: any, i: number) => (
                        <div key={i} className="__type" id={m.type.name}>
                          {m.type.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="__container __main-bot --flex-row">
              <div className="__inner-container --justify-start">
                <img src="https://archives.bulbagarden.net/media/upload/thumb/a/a7/PSMD_poster.png/250px-PSMD_poster.png" />
              </div>
              <div className="__body-right-box --flex-col">
                <span className="__sub-title">{titleStr}</span>
                <span className="__sub-title">{titleStr2}</span>
                <a className="__button __menu-link" href="/p">
                  discover more
                </a>
              </div>
            </div>
          </section>

          {/* end main */}

          {/* prev next */}

          <section className="__container --flex-row">
            {pokemon.id > firstIdx && (
              <div
                className="__main-nav --flex-row --center"
                onClick={() => setPokeId(prevPokemon.id.toString())}
              >
                <FontAwesomeIcon icon={faArrowLeftLong} size="2xl" />
                <img className="__nav-img" src={prevPokemon.sprites} />
              </div>
            )}

            {pokemon.id < lastIdx && (
              <div
                className="__main-nav --flex-row --center"
                onClick={() => setPokeId(nextPokemon.id.toString())}
              >
                <img className="__nav-img" src={nextPokemon.sprites} />
                <FontAwesomeIcon icon={faArrowRightLong} size="2xl" />
              </div>
            )}
          </section>
        </>
      )}
    </article>
  );
};

export default LandingPage;
