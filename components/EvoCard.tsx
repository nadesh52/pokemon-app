import Image from "next/image";
import React from "react";
import logo from "@/public/assets/logos/pokeball_logo.png";

const EvoCard = ({ evo, onClick }: any) => {
  return (
    <button onClick={onClick}>
      <div className="hover:bg-skin-fill-dark p-2 rounded-md transition-all group">
        <Image
          src={evo.sprites ? evo.sprites : logo}
          alt="evo-stage"
          height={100}
          width={100}
          className="group-hover:scale-150 transition-all"
        />

        {/* <div className="flex justify-evenly items-center">
          {evo.types.map((m: any, i: number) => (
            <span
              key={i}
              className="bg-skin-fill w-fit px-1 rounded text-skin-base font-josefin z-50"
            >
              {m.type.name}
            </span>
          ))}
        </div> */}
      </div>
    </button>
  );
};

export default EvoCard;
