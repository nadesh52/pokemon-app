import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import "./GenSelection.css";
import { generations, Generation } from "../../utils/fetcher";

const GenSelection = ({ selectedGen }: any) => {
  const handleChangeGen = (e: SelectChangeEvent) => {
    selectedGen(e.target.value);
  };

  return (
    <FormControl>
      <Select
        className="__select"
        size="small"
        defaultValue=""
        onChange={(e) => handleChangeGen(e)}
      >
        {generations.map((gen: Generation, i: number) => (
          <MenuItem
            key={i}
            value={JSON.stringify({
              id: gen.id,
              name: gen.name,
              region: gen.region,
              offset: gen.offset,
              limit: gen.limit,
            })}
          >
            {gen.name} ({gen.region})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenSelection;
