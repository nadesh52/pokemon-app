export default function getTheme(jsonData: any) {
  if (jsonData.types.length >= 2) {
    if (jsonData.types[0].type.name === "normal") {
      const newTheme = `theme-${jsonData.types[1].type.name}`;

      return newTheme;
    } else {
      const newTheme = `theme-${jsonData.types[0].type.name}`;

      return newTheme;
    }
  } else {
    const newTheme = `theme-${jsonData.types[0].type.name}`;
    return newTheme;
  }
}
