import { createContext, useMemo, useState } from "react";
import {
  useTheme,
  ThemeProvider as Provider,
  createTheme,
  CssBaseline,
} from "@mui/material";

const getColors = (mode) => {
  return {
    ...(mode === "dark"
      ? {
          secondary: {
            100: "#FAFAFA",
            200: "#EEEEEE",
            300: "#E0E0E0",
            400: "#BDBDBD",
            500: "#9E9E9E",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
          },
          primary: {
            100: "#CFD8DC",
            200: "#B0BEC5",
            300: "#90A4AE",
            400: "#78909C",
            500: "#607D8B",
            600: "#546E7A",
            700: "#455A64",
            800: "#37474F",
            900: "#263238",
          },
        }
      : {
          primary: {
            900: "#212121",
            800: "#424242",
            700: "#616161",
            600: "#757575",
            // 500: "#9E9E9E",
            500: "#607D8B",
            400: "#BDBDBD",
            300: "#E0E0E0",
            200: "#EEEEEE",
            100: "#FAFAFA",
          },
          secondary: {
            900: "#263238",
            800: "#37474F",
            100: "#455A64",
            600: "#546E7A",
            200: "#607D8B",
            400: "#78909C",
            300: "#90A4AE",
            500: "#B0BEC5",
            700: "#CFD8DC",
          },
        }),
  };
};

const getThemeSetting = (mode) => {
  const colors = getColors(mode);
  const fontFamily = ["Source Sans Pro", "sans-serif"].join(",");

  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[900],
            },
            secondary: {
              main: colors.secondary[900],
            },
            background: {
              default: colors.secondary[900],
            },
            neutral: {
              dark: colors.secondary[700],
              main: colors.secondary[500],
              light: colors.secondary[300],
            },
          }
        : {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.primary[500],
            },
            background: {
              default: colors.primary[100],
            },
            neutral: {
              dark: colors.secondary[900],
              main: colors.secondary[500],
              light: colors.secondary[900],
            },
          }),
    },
    typography: {
      fontFamily,
      fontSize: 12,
      h1: {
        fontFamily,
        fontSize: 40,
      },
      h2: {
        fontFamily,
        fontSize: 32,
      },
      h3: {
        fontFamily,
        fontSize: 24,
      },
      h4: {
        fontFamily,
        fontSize: 20,
      },
      h5: {
        fontFamily,
        fontSize: 16,
      },
      h6: {
        fontFamily,
        fontSize: 12,
      },
    },
  };
};

export const ThemeContext = createContext({
  mode: "dark",
  toggleMode: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  const theme = useMemo(() => {
    return createTheme(getThemeSetting(mode));
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ toggleMode, mode }}>
      <Provider theme={theme}>
        <CssBaseline />
        {children}
      </Provider>
    </ThemeContext.Provider>
  );
};

export const useColors = () => {
  const theme = useTheme();
  const colors = useMemo(
    () => getColors(theme.palette.mode),
    [theme.palette.mode]
  );

  return colors;
};
