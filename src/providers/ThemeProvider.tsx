import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { themes } from "@/theme";
import { useColorScheme } from "react-native";
import { ThemeMode, ThemeTokens } from "@/types/global";
import { createContext, PropsWithChildren, useState } from "react";

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...themes.light,
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...themes.dark,
  },
};
export type ThemeContextValue = {
  mode: ThemeMode;
  theme: ThemeTokens;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  mode: "dark",
  theme: themes.dark,
  toggleTheme: () => undefined,
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const systemMode: ThemeMode = useColorScheme() === "dark" ? "dark" : "light";
  const [mode, setMode] = useState<ThemeMode>(systemMode);
  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme: theme.colors as ThemeTokens,
        toggleTheme: () => {
          setMode(currentMode => (currentMode === "dark" ? "light" : "dark"));
        },
      }}
    >
      <NavigationContainer theme={theme}>{children}</NavigationContainer>
    </ThemeContext.Provider>
  );
};
