"use client";
import { Generation, generations } from "@/types/Generation";
import { capitalize } from "@/utils/capitalize";
import { useEffect, useRef, useState } from "react";

const GenSelection = ({ selectedGen }: any) => {
  const [isHidden, setIsHidden] = useState(true);

  const listRef = useRef(null);
  const menuRef = useRef(null);

  const handleClick = (event: any, gen: any) => {
    event.preventDefault();
    selectedGen(gen);
  };

  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (e.target !== listRef.current || e.target === menuRef.current) {
        setIsHidden(true);
      }
    });
  }, []);

  return (
    <div className="bg-skin-white rounded-lg w-fit mx-auto shadow-md">
      <label className="relative">
        <button
          ref={listRef}
          onClick={() => setIsHidden(false)}
          className="bg-white h-10 rounded-md px-4"
        >
          <div className="flex justify-between items-center gap-2 pointer-events-none">
            <span className="font-josefin text-lg font-medium">
              Select Generation
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </span>
          </div>
        </button>
        {!isHidden && (
          <div
            ref={menuRef}
            className="absolute bg-skin-white left-0 top-full mt-3.5 z-50 "
          >
            <ul className="p-2 rounded-lg shadow-md text-left">
              {generations.map((gen: Generation, idx: number) => (
                <li
                  key={idx}
                  className="px-4 py-2 bg-skin-white text-skin-type rounded-md cursor-pointer hover:bg-skin-fill hover:text-skin-base select-none"
                  onClick={(e: any) => handleClick(e, gen)}
                >
                  <span className="pointer-events-none">
                    {capitalize(gen.region)} ({capitalize(gen.name)})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </label>
    </div>
  );
};

export default GenSelection;
