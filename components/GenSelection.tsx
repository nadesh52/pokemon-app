import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { generations, Generation } from "../utils/fetcher";

const GenSelection = ({ selectedGen }: any) => {
  return (
    <FormControl>
      <Select
        className="__select"
        size="small"
        defaultValue=""
        onChange={(e: SelectChangeEvent) => selectedGen(e.target.value)}
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
