import React, { useContext } from 'react';

export interface ThemeContextValues {}

export const ThemeContext = React.createContext({} as ThemeContextValues);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
  return (
    <ThemeContext.Provider
      value={{}}
    >
      {children}
    </ThemeContext.Provider>
  );
};
