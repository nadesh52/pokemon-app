"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/public/assets/logos/pokeball_logo.png";

const PokemonPage = ({ params }: { params: { pokemonId: string } }) => {
  const [pokemon, setPokemon] = useState({ sprites: { front_default: "" } });
  const fetchData = async () => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`;
    const res = await fetch(URL);
    const jsonData = await res.json();

    setPokemon(jsonData);

    console.log(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {params.pokemonId}
      <Image
        src={pokemon.sprites.front_default}
        alt="y                                                                                                                                                                                                                                                                                                                                              "
        height={100}
        width={100}
      />
    </div>
  );
};

export default PokemonPage;
