"use client";
import { useState } from "react";
import { Pokemon } from "@/types/Pokemon";
import GenSelection from "@/components/GenSelection";
import FilterType from "@/components/FilterType";
import Card from "@/components/Card";
import { Generation, generations } from "@/types/Generation";
import logo from "@/public/assets/logos/pokeball_logo.png";
import Image from "next/image";
// import Pagination from "@/components/Pagination";
import useFetcher from "@/hook/fetcher";
import usePagination from "@/hook/pagination";

const PokemonsTable = () => {
  const [selectedTypes, setSelectedTypes] = useState<string>("all");
  const [gens, setGens] = useState<Generation>(generations[0]);
  const { count } = usePagination(gens.limit, gens.offset);

  const { pokemonsData, isPending, setLimit, setOffset, setReFetch } =
    useFetcher(gens.offset, gens.limit);

  const handleSelectGen = (e: any) => {
    console.log(count);
    setGens(e);
    setLimit(e.limit);
    setOffset(e.offset);
    setSelectedTypes("all");
    setReFetch({});
  };

  return (
    <section className="bg-base min-h-[calc(100dvh-114px)]">
      <nav className="flex justify-between items-center bg-accent p-4">
        <div className="hover:rotate-45 transition">
          <a href="/pokemon">
            <Image src={logo} alt="" height={40} width={40} />
          </a>
        </div>

        <ul className="flex items-center gap-3">
          <li>
            <a href="/">
              <span className="font-josefin font-medium text-lg p-2 w-fit bg-accent rounded-md hover:text-white hover:bg-secondary transition">
                Home
              </span>
            </a>
          </li>
        </ul>
      </nav>

      {isPending ? (
        <div className="flex items-center justify-center min-h-[calc(100dvh-183px)] w-full">
          <span className="font-josefin font-medium text-2xl text-secondary">
            ...fetching pokemon
          </span>
        </div>
      ) : (
        <>
          <div className="max-w-screen-lg mx-auto my-5">
            <GenSelection selectedGen={(e: any) => handleSelectGen(e)} />
            <FilterType selectedType={(e: any) => setSelectedTypes(e)} />
            <p className="text-center text-2xl text-secondary font-josefin font-medium">
              {gens.region.toUpperCase()}
            </p>
          </div>
          <div className="max-w-screen-xl grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 mx-auto gap-3 px-4 pt-2 pb-5 transition-all">
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
      {/* 
      <>
        {pages.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div>
          <button>next</button>
        </div>
      </>*/}

      {/* <Pagination startPage={startIndex} perPage={perPage} count={count} /> */}
    </section>
  );
};

export default PokemonsTable;
