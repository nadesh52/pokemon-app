"use client";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoadingBlock from "./LoadingBlock";
import logo from "@/public/assets/logos/pokeball_logo.png";

type NavPoke = {
  id: number;
  sprite: string;
};

const initNavPoke: NavPoke = {
  id: 0,
  sprite: "",
};

const firstIdx = 1;
const lastIdx = 1025;

const URL = "https://pokeapi.co/api/v2/pokemon/";

const NavPokemon = ({ pokemon, onNewNav }: any) => {
  const [prev, setPrev] = useState<NavPoke>(initNavPoke);
  const [next, setNext] = useState<NavPoke>(initNavPoke);
  const [isPending, setIsPending] = useState<boolean>(true);

  const fetchNavPokemon = async (nav: any) => {
    setIsPending(true);

    if (
      nav.id > firstIdx ||
      nav.id < lastIdx ||
      nav.id === firstIdx ||
      nav.id === lastIdx
    ) {
      const resPrev = await fetch(`${URL}${nav.id - 1}`);
      const jsonPrev = await resPrev.json();

      const newPrev: NavPoke = {
        id: jsonPrev.id,
        sprite: jsonPrev.sprites.front_default,
      };

      const resNext = await fetch(`${URL}${nav.id + 1}`);
      const jsonNext = await resNext.json();

      const newNext: NavPoke = {
        id: jsonNext.id,
        sprite: jsonNext.sprites.front_default,
      };

      setPrev(newPrev);
      setNext(newNext);
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchNavPokemon(pokemon);
  }, [pokemon]);

  return (
    <section className="bg-skin-fill-light py-4 flex items-center justify-evenly">
      {isPending ? (
        <LoadingBlock />
      ) : (
        <>
          {pokemon.id >= firstIdx && (
            <div
              className="flex items-center gap-4 text-skin-base"
              onClick={() => onNewNav(prev.id)}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} size="xl" />

              <Image
                src={prev.sprite ? prev.sprite : logo}
                alt=""
                height={80}
                width={80}
              />
            </div>
          )}

          {pokemon.id <= lastIdx && (
            <div
              className="flex items-center gap-4 text-skin-base"
              onClick={() => onNewNav(next.id)}
            >
              <Image
                src={next.sprite ? next.sprite : logo}
                alt=""
                height={80}
                width={80}
              />

              <FontAwesomeIcon icon={faArrowRightLong} size="xl" />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default NavPokemon;
