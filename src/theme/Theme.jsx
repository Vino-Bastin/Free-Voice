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
            100: "#d0d1d5",
            200: "#a1a4ab",
            300: "#727681",
            400: "#1F2A40",
            500: "#141b2d",
            600: "#101624",
            700: "#0c101b",
            800: "#080b12",
            900: "#040509",
          },
          primary: {
            100: "#ffcce0",
            200: "#ff9ac2",
            300: "#ff67a3",
            400: "#ff3585",
            500: "#ff0266",
            600: "#cc0252",
            700: "#99013d",
            800: "#660129",
            900: "#330014",
          },
        }
      : {
          primary: {
            900: "#d0d1d5",
            800: "#a1a4ab",
            700: "#727681",
            600: "#1F2A40",
            500: "#ff0266",
            400: "#101624",
            300: "#0c101b",
            200: "#080b12",
            100: "#040509",
          },
          secondary: {
            900: "#ff0266",
            800: "#ff9ac2",
            700: "#ff67a3",
            600: "#ff3585",
            500: "#ffcce0",
            400: "#cc0252",
            300: "#99013d",
            200: "#660129",
            100: "#330014",
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
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
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
              main: colors.secondary[900],
            },
            secondary: {
              main: colors.secondary[500],
            },
            background: {
              default: colors.primary[900],
            },
            neutral: {
              dark: colors.secondary[700],
              main: colors.secondary[500],
              light: colors.secondary[300],
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
    <ThemeContext.Provider value={{ toggleMode }}>
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
