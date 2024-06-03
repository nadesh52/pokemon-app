"use client";
import { useEffect, useState } from "react";
import logo from "@/public/assets/logos/pokeball_logo.png";
import { Pokemon } from "@/types/Pokemon";
import { Generation, generations } from "@/types/Generation";
import GenSelection from "@/components/GenSelection";
import FilterType from "@/components/FilterType";
import Card from "@/components/Card";
import Image from "next/image";
import useFetcher from "@/hook/fetcher";
import LoadingBlock from "@/components/LoadingBlock";

const PokemonsTable = () => {
  const [selectedTypes, setSelectedTypes] = useState<string>("all");
  const [gens, setGens] = useState<Generation>(generations[0]);

  const { pokemonsData, isPending, setReFetch } = useFetcher(
    gens.offset,
    gens.limit
  );

  const handleSelectGen = (e: any) => {
    setGens(e);
    setSelectedTypes("all");
    setReFetch({});
  };

  useEffect(() => {}, []);

  return (
    <section className="bg-skin-white min-h-[calc(100dvh-114px)]">
      <nav className="flex justify-between items-center bg-skin-fill p-4">
        <div className="hover:rotate-45 transition">
          <a href="/pokemon">
            <Image src={logo} alt="" height={40} width={40} />
          </a>
        </div>
        <ul className="flex items-center gap-3">
          <li>
            <a href="/">
              <span className="font-josefin font-medium text-lg p-2 w-fit rounded-md hover:text-skin-base hover:bg-skin-fill-dark transition">
                Home
              </span>
            </a>
          </li>
        </ul>
      </nav>

      {isPending ? (
        <LoadingBlock />
      ) : (
        <>
          <div className="max-w-screen-lg mx-auto my-5">
            <GenSelection selectedGen={(e: any) => handleSelectGen(e)} />
            <FilterType selectedType={(e: any) => setSelectedTypes(e)} />
            <p className="text-center text-2xl text-secondary font-josefin font-medium">
              {gens.region.toUpperCase()}
            </p>
          </div>
          <div className="max-w-screen-xl grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 mx-auto gap-3 px-4 pt-2 pb-5 transition-all">
            {selectedTypes === "all" ? (
              <>
                {pokemonsData.map((pokemon: Pokemon) => (
                  <Card key={pokemon.id} content={pokemon} />
                ))}
              </>
            ) : (
              <>
                {pokemonsData
                  .filter((pokemon) => {
                    return pokemon.types.find((type: any) => {
                      return type.type.name === selectedTypes;
                    });
                  })
                  .map((pokemon: Pokemon) => (
                    <Card key={pokemon.id} content={pokemon} />
                  ))}
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default PokemonsTable;
