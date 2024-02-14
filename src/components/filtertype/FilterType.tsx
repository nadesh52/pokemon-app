import { Box, Radio, Tooltip, Grid } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { typePokemon } from "../../types/pokemon";
import "./FilterType.css";

function FilterType({ selectedType }: any) {
  const [selectedValue, setSelectedValue] = useState<string>("all");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    selectedType(event.target.value);
  };

  return (
    <div className="__filter-container">
      {typePokemon.map((type, i) => (
        <div className="__filter__icon-container" key={i}>
          <Tooltip title={type.name} placement="top" disableInteractive>
            <Radio
              checked={selectedValue === type.name}
              onChange={handleChange}
              value={type.name}
              name={type.name}
              icon={
                <img
                  className="__filter__icon --gray"
                  src={`../src/assets/icons/types/${type.name}.png`}
                  alt="icon-gray"
                />
              }
              checkedIcon={
                <img
                  className="__filter__icon"
                  src={`../src/assets/icons/types/${type.name}.png`}
                  alt="icon"
                />
              }
            />
          </Tooltip>
        </div>
      ))}
    </div>
  );
}

export default FilterType;
