export const randomNumber = (e: any) => {
  const numberOfPokemon = 1025;
  e.preventDefault();
  const result = Math.floor(Math.random() * numberOfPokemon);
  return result.toString();
};
