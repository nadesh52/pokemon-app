"use client";
import { Pokemon } from "@/types/Pokemon";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Pagination = ({ startIndex, perPage, count }: any) => {
  const [pages, setPages] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const fetchData = async () => {
    // setPages([...Array(Math.ceil(count / perPage) + 1).keys()].slice(1));

    const API_URL = "https://pokeapi.co/api/v2/pokemon";

    const response = await fetch(
      `${API_URL}?offset=${startIndex}&limit=${perPage}`
    );
    const jsonData = await response.json();

    setPokemons(jsonData.results);

    console.log(count, perPage, pages, jsonData.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      Pagination
      <div>start page: {startIndex}</div>
      <div>per page: {perPage}</div>
      {pokemons.map((p: any, i: any) => (
        <Card key={i} content={p} />
      ))}
      <div>
        {pages.map((p, i) => (
          <ul key={i}>
            <li>{p}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
