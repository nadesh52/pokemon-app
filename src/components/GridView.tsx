import React from "react";
import { Grid, Stack, Box, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

interface PokemonProps {
  pokemonName: string;
  pokemonType: TypeProps[];
  pokemonSprite: string;
  onClick: string;
}

interface TypeProps {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

const GridView = ({
  pokemonName,
  pokemonType,
  pokemonSprite,
  onClick,
}: PokemonProps) => {
  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Link to={onClick} style={{ textDecoration: "none", color: "inherit" }}>
      <Grid
        item
        sx={{
          bgcolor: "#FFCB05",
          border: "3px solid",
          borderColor: "#3466AF",
          borderRadius: 2,
          padding: 2,
          boxSizing: "border-box",
          boxShadow: "0px 0px 0px 0px",
          "&:hover": {
            boxShadow: " inset 0px 0px 10px 0px rgba(48, 106, 192, 1)",
          },
        }}
      >
        {/* Detail */}
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          rowGap={1}
          height={160}
        >
          <Box component="img" src={pokemonSprite} alt="sprite" width={110} />
          <Box>{capitalize(pokemonName)}</Box>
          <Stack direction="row" columnGap={2}>
            {pokemonType.map((t: TypeProps, i: number) => (
              <Tooltip
                arrow
                disableInteractive
                title={capitalize(t.type.name)}
                placement="top"
                key={i}
              >
                <Box
                  component="img"
                  src={`../src/assets/icons/types/${t.type.name}.png`}
                  width={25}
                />
              </Tooltip>
            ))}
          </Stack>
        </Stack>
      </Grid>
    </Link>
  );
};

export default GridView;
