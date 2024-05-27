"use client";
import { Generation, generations } from "@/types/Generation";
import { capitalize } from "@/utils/capitalize";
import { useEffect, useRef, useState } from "react";

const GenSelection = ({ selectedGen }: any) => {
  const [isHidden, setIsHidden] = useState(true);

  const listRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (e.target !== listRef.current) {
        setIsHidden(true);
      }
    });
  }, []);

  return (
    <label className="relative">
      <button
        ref={listRef}
        onClick={() => setIsHidden(!isHidden)}
        className="h-10 w-full"
      >
        <span className="pointer-events-none">Generation Select</span>
      </button>
      {!isHidden && (
        <div
          ref={menuRef}
          className="absolute bg-white left-0 top-full min-w-full w-max z-50"
        >
          <ul className="p-2 rounded-lg shadow-md text-left">
            {generations.map((gen: Generation, idx: number) => (
              <li
                key={idx}
                className="px-4 py-2 bg-white text-secondary rounded-md hover:bg-secondary hover:text-white cursor-default select-none"
                onClick={() =>
                  selectedGen(
                    JSON.stringify({
                      id: gen.id,
                      name: gen.name,
                      region: gen.region,
                      offset: gen.offset,
                      limit: gen.limit,
                    })
                  )
                }
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

    // <FormControl>
    //   <Select
    //     className="__select"
    //     size="small"
    //     defaultValue=""
    //     onChange={(e: SelectChangeEvent) => selectedGen(e.target.value)}
    //   >
    //     {generations.map((gen: Generation, i: number) => (
    //       <MenuItem
    //         key={i}
    //         value={JSON.stringify({
    //           id: gen.id,
    //           name: gen.name,
    //           region: gen.region,
    //           offset: gen.offset,
    //           limit: gen.limit,
    //         })}
    //       >
    //         {gen.name} ({gen.region})
    //       </MenuItem>
    //     ))}
    //   </Select>
    // </FormControl>
  );
};

export default GenSelection;
