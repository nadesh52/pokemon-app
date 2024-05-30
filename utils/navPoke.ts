type NavPoke = {
  id: number;
  name: string;
  sprites: string;
};

const URL = "https://pokeapi.co/api/v2/pokemon/";

export const prevPoke = async (id: any) => {
  const prevData = await fetch(`${URL}${id - 1}`);
  const prevPokeJson = await prevData.json();

  const prevP: NavPoke = {
    id: prevPokeJson.id,
    name: prevPokeJson.name,
    sprites: prevPokeJson.sprites["other"]["official-artwork"]["front_default"],
  };
  return await prevP;
};

export const nextPoke = async (id: any) => {
  const nextData = await fetch(`${URL}${id + 1}`);
  const nextPokeJson = await nextData.json();

  const nextP: NavPoke = {
    id: nextPokeJson.id,
    name: nextPokeJson.name,
    sprites: nextPokeJson.sprites["other"]["official-artwork"]["front_default"],
  };
  return await nextP;
};
