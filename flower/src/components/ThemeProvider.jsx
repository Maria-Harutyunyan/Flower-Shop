import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { THEME } from "../components/constants/constants";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"; // Get saved theme from localStorage
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light"); // Save theme on change
  }, [darkMode]);

  const theme = useMemo(() => (darkMode ? THEME.dark : THEME.light), [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev); // Function to toggle theme

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
