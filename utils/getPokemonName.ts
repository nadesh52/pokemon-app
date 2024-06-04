export default function getPokemonName(name: any): string {
  const enName = name
    .filter((n: any) => n.language.name === "en")
    .map((na: any) => {
      return na.name;
    })
    .join("");
  return enName;
}
