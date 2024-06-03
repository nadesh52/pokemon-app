export const randomNumber = () => {
  const numberOfPokemon = 1025;
  const result = Math.floor(Math.random() * numberOfPokemon);
  return result.toString();
};
