"use client";
import React, { useEffect, useState } from "react";
import EvoCard from "./EvoCard";
import LoadingBlock from "./LoadingBlock";

type EvoPoke = {
  id: number;
  name: string;
  sprites: string;
  types: [];
};

const URL = "https://pokeapi.co/api/v2/pokemon/";

const EvoChain = ({ evoData, onEvoClick }: any) => {
  const [evoChain, setEvoChain] = useState([]);
  const [isPending, setIsPending] = useState(true);

  const getEvoChain = async (evoChainJson: any) => {
    setIsPending(true);

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
              sprites: json1.sprites.other["official-artwork"]["front_default"],
              types: json1.types,
            };

            const s2: EvoPoke = {
              id: json2.id,
              name: json2.name,
              sprites: json2.sprites.other["official-artwork"]["front_default"],
              types: json2.types,
            };

            const s3: EvoPoke = {
              id: json3.id,
              name: json3.name,
              sprites: json3.sprites.other["official-artwork"]["front_default"],
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
              sprites: json1.sprites.other["official-artwork"]["front_default"],
              types: json1.types,
            };

            const s2: EvoPoke = {
              id: json2.id,
              name: json2.name,
              sprites: json2.sprites.other["official-artwork"]["front_default"],
              types: json2.types,
            };
            allChain.push(s1, s2);
            return setEvoChain(allChain);
          }
        }
      });
      setIsPending(false);
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

      setIsPending(false);
      return setEvoChain(allChain);
    }
  };
  useEffect(() => {
    getEvoChain(evoData);
  }, [evoData]);

  return (
    <div className="bg-skin-fill-light p-4">
      <span className="text-2xl text-skin-base font-medium font-josefin">
        Evolution Chain
      </span>

      {isPending ? (
        <LoadingBlock />
      ) : (
        <>
          <div className="flex justify-evenly items-center mt-2">
            {evoChain.map((evo: any, i: number) => (
              <EvoCard
                key={i}
                evo={evo}
                onClick={() => {
                  onEvoClick(evo.id);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EvoChain;
