const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { noto: ["Noto Sans Thai"], josefin: ["Josefin Sans"] },
    },
    colors: {
      primary: "#211951",
      secondary: "#836FFF",
      base: "#F0F3FF",
      accent: "#15F5BA",
      black: "#0F0F0F",
      white: "#FFFFFF",
      red: "#C70039",
      green: "#68B984",
      yellow: "#FED049",
      grey: "#DBEDF3",
      type: {
        all: {
          normal: "#68A090",
          dark: "#44685E",
          light: "#9DC1B7",
        },
        bug: {
          normal: "#A8B820",
          dark: "#6D7815",
          light: "#C6D16E",
        },
        dark: {
          normal: "#705848",
          dark: "#49392F",
          light: "#A29288",
        },
        dragon: {
          normal: "#7038F8",
          dark: "#4924A1",
          light: "#A27DFA",
        },
        electric: {
          normal: "#F8D030",
          dark: "#A1871F",
          light: "#FAE078",
        },
        fairy: {
          normal: "#EE99AC",
          dark: "#9B6470",
          light: "#F4BDC9",
        },
        fighting: {
          normal: "#C03028",
          dark: "#7D1F1A",
          light: "#D67873",
        },
        fire: {
          normal: "#F08030",
          dark: "#9C531F",
          light: "#F5AC78",
        },
        flying: {
          normal: "#A890F0",
          dark: "#6D5E9C",
          light: "#C6B7F5",
        },
        ghost: {
          normal: "#705898",
          dark: "#493963",
          light: "#A292BC",
        },
        grass: {
          normal: "#78C850",
          dark: "#4E8234",
          light: "#A7DB8D",
        },
        ground: {
          normal: "#E0C068",
          dark: "#927D44",
          light: "#EBD69D",
        },
        ice: {
          normal: "#98D8D8",
          dark: "#638D8D",
          light: "#BCE6E6",
        },
        normal: {
          normal: "#A8A878",
          dark: "#6D6D4E",
          light: "#C6C6A7",
        },
        poison: {
          normal: "#A040A0",
          dark: "#682A68",
          light: "#C183C1",
        },
        psychic: {
          normal: "#F85888",
          dark: "#A13959",
          light: "#FA92B2",
        },
        rock: {
          normal: "#B8A038",
          dark: "#786824",
          light: "#D1C17D",
        },
        steel: {
          normal: "#B8B8D0",
          dark: "#787887",
          light: "#D1D1E0",
        },
        water: {
          normal: "#6890F0",
          dark: "#445E9C",
          light: "#9DB7F5",
        },
      },
    },
    borderColor: {
      DEFAULT: "#DBEDF3",
      primary: "#211951",
      secondary: "#836FFF",
      base: "#F0F3FF",
      accent: "#15F5BA",
      black: "#0F0F0F",
      white: "#FFFFFF",
      red: "#C70039",
      green: "#68B984",
      yellow: "#FED049",
      grey: "#DBEDF3",
      type: {
        all: {
          normal: "#68A090",
          dark: "#44685E",
          light: "#9DC1B7",
        },
        bug: {
          normal: "#A8B820",
          dark: "#6D7815",
          light: "#C6D16E",
        },
        dark: {
          normal: "#705848",
          dark: "#49392F",
          light: "#A29288",
        },
        dragon: {
          normal: "#7038F8",
          dark: "#4924A1",
          light: "#A27DFA",
        },
        electric: {
          normal: "#F8D030",
          dark: "#A1871F",
          light: "#FAE078",
        },
        fairy: {
          normal: "#EE99AC",
          dark: "#9B6470",
          light: "#F4BDC9",
        },
        fighting: {
          normal: "#C03028",
          dark: "#7D1F1A",
          light: "#D67873",
        },
        fire: {
          normal: "#F08030",
          dark: "#9C531F",
          light: "#F5AC78",
        },
        flying: {
          normal: "#A890F0",
          dark: "#6D5E9C",
          light: "#C6B7F5",
        },
        ghost: {
          normal: "#705898",
          dark: "#493963",
          light: "#A292BC",
        },
        grass: {
          normal: "#78C850",
          dark: "#4E8234",
          light: "#A7DB8D",
        },
        ground: {
          normal: "#E0C068",
          dark: "#927D44",
          light: "#EBD69D",
        },
        ice: {
          normal: "#98D8D8",
          dark: "#638D8D",
          light: "#BCE6E6",
        },
        normal: {
          normal: "#A8A878",
          dark: "#6D6D4E",
          light: "#C6C6A7",
        },
        poison: {
          normal: "#A040A0",
          dark: "#682A68",
          light: "#C183C1",
        },
        psychic: {
          normal: "#F85888",
          dark: "#A13959",
          light: "#FA92B2",
        },
        rock: {
          normal: "#B8A038",
          dark: "#786824",
          light: "#D1C17D",
        },
        steel: {
          normal: "#B8B8D0",
          dark: "#787887",
          light: "#D1D1E0",
        },
        water: {
          normal: "#6890F0",
          dark: "#445E9C",
          light: "#9DB7F5",
        },
      },
    },
    fontSize: {
      xs: ["10px", "14px"],
      sm: ["12px", "16px"],
      md: ["14px", "20px"],
      lg: ["16px", "24px"],
      xl: ["18px", "28px"],
      "2xl": ["20px", "28px"],
      "3xl": ["24px", "32px"],
      "4xl": ["30px", "36px"],
      "5xl": ["36px", "42px"],
    },
    screens: {
      "2xs": "320px",
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
export default config;
