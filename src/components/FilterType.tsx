import { Box, Stack, Radio, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { typePokemon } from "../types/Pokemon";

function FilterType({ selectedType }) {
  const [selectedValue, setSelectedValue] = useState<string>("all");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    selectedType(event.target.value);
  };

  return (
    <div>
      <Stack direction="row" justifyContent="center" alignItems="center">
        {typePokemon.map((type, i) => (
          <Box key={i}>
            <Tooltip title={type} placement="top" disableInteractive>
              <Radio
                checked={selectedValue === type}
                onChange={handleChange}
                value={type}
                name={type}
                icon={
                  <Box
                    component="img"
                    src={`./src/assets/icons/types/${type}.png`}
                    width={25}
                    sx={{ filter: "grayscale(100%)" }}
                  />
                }
                checkedIcon={
                  <Box
                    component="img"
                    src={`./src/assets/icons/types/${type}.png`}
                    width={25}
                  />
                }
              />
              {console.log(`./src/assets/icons/types/${type}.png`)}
            </Tooltip>
          </Box>
        ))}
      </Stack>
    </div>
  );
}

export default FilterType;
