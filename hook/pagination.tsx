"use client";
import React, { useEffect, useState } from "react";

export default function usePagination(_limit: any, _offset: any) {
  const [startIndex, setStartIndex] = useState(_offset);
  const [pages, setPages] = useState<number[]>([]);
  const [perPage, setPerPage] = useState(0);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState(0);
  const [count, setCount] = useState(_limit - _offset);

  const API_URL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchData = async () => {
      const perPage = 20;
      const page = Math.ceil(count / perPage);
      const totalPages = [...Array(page + 1).keys()].slice(1);
      setPages(totalPages);

      const response = await fetch(
        `${API_URL}?offset=${startIndex}&limit=${perPage}`
      );
      const jsonData = await response.json();

      setNextPage(jsonData.next);

      console.log(count, perPage, jsonData);
    };

    fetchData();
  }, []);
  return {
    // startIndex,
    // nextPage,
    // prevPage,
    count,
    // pages,
    // setPerPage,
    // setStartIndex,
  };
}
