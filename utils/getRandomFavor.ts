export default function getRandomFavor(jsonSpecies: any) {
  const f = jsonSpecies.flavor_text_entries
    .filter((n: any) => n.language.name === "en")
    .map((m: any) => {
      return m;
    });

  const randomPick = f[Math.floor(Math.random() * f.length)];
  return randomPick;
}
