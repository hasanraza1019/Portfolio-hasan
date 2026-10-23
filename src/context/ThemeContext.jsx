import { createContext, useContext, useEffect, useState } from "react";
import { isSoundEnabled, setSoundEnabled, playThemeSound } from "../utils/sound";
import { THEMES } from "./themes";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio_theme") || "cyber";
    }
    return "cyber";
  });

  const [soundOn, setSoundOnState] = useState(() => isSoundEnabled());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "cyber") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
    localStorage.setItem("portfolio_theme", theme);
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    playThemeSound();
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOnState(next);
    setSoundEnabled(next);
    if (next) playThemeSound();
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, soundOn, toggleSound, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

