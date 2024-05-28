import Image from "next/image";
import { capitalize } from "../utils/capitalize";

const Card = ({ content }: any) => {
  return (
    <div className="bg-white shadow-sm rounded-md py-1 px-3 flex flex-col items-center justify-center transition group hover:scale-105 hover:shadow-lg">
      {/* <Image
        src={content.sprite}
        alt="sprite"
        width={150}
        height={150}
        className="group-hover:scale-125 delay-100 duration-300"
      /> */}
      <span className="font-josefin font-medium z-40 bg-white bg-opacity-40 text-whites select-none group-hover:text-black transition">
        {capitalize(content.name)}
      </span>
    </div>
  );
};

export default Card;
