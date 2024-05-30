import { ChangeEvent, useState } from "react";
import { typePokemon } from "../types/Pokemon";
import Image from "next/image";

function FilterType({ selectedType }: any) {
  const [selectedValue, setSelectedValue] = useState<string>("all");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    selectedType(event.target.value);
  };

  return (
    <div className="bg-white rounded-lg p-5 my-5 w-fit mx-auto shadow-md">
      <div className="justify-center grid grid-cols-[repeat(7,_30px)] xs:grid-cols-[repeat(9,_30px)] sm:grid-cols-[repeat(10,_30px)] gap-3">
        {typePokemon.map((type, i) => (
          <div key={i} className="justify-self-center h-[30px]">
            <label htmlFor={type.name} className="inline-block cursor-pointer">
              <input
                type="radio"
                name="type"
                id={type.name}
                checked={selectedValue === type.name}
                value={type.name}
                onChange={handleChange}
                className="hidden peer"
              />
              <Image
                src={`/assets/icons/types/${type.name}.png`}
                alt="icon-gray"
                height={30}
                width={30}
                className="grayscale peer-checked:grayscale-0"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterType;
