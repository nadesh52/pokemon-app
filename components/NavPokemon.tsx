import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

const firstIdx = 1;
const lastIdx = 1025;

const NavPokemon = ({
  pokemon,
  prevPokemon,
  nextPokemon,
  prevClick,
  nextClick,
}: any) => {
  return (
    <section className="bg-skin-fill-light py-4 flex items-center justify-evenly">
      {pokemon.id > firstIdx && (
        <div
          className="flex items-center gap-4 text-skin-base"
          onClick={() => prevClick(prevPokemon.id.toString())}
        >
          <FontAwesomeIcon icon={faArrowLeftLong} size="xl" />
          <Image src={prevPokemon.sprites} alt="" height={80} width={80} />
        </div>
      )}

      {pokemon.id < lastIdx && (
        <div
          className="flex items-center gap-4 text-skin-base"
          onClick={() => nextClick(nextPokemon.id.toString())}
        >
          <Image src={nextPokemon.sprites} alt="" height={80} width={80} />
          <FontAwesomeIcon icon={faArrowRightLong} size="xl" />
        </div>
      )}
    </section>
  );
};

export default NavPokemon;
