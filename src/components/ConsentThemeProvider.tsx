import React, { createContext, useContext, useState } from 'react';

interface ConsentThemeContextType {
  dark: boolean;
  toggle: () => void;
}

const ConsentThemeContext = createContext<ConsentThemeContextType | undefined>(undefined);

export const ConsentThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dark, setDark] = useState(false);
  const toggle = () => setDark((d) => !d);
  React.useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);
  return (
    <ConsentThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ConsentThemeContext.Provider>
  );
};

export const useConsentTheme = () => {
  const ctx = useContext(ConsentThemeContext);
  if (!ctx) throw new Error('useConsentTheme must be used within ConsentThemeProvider');
  return ctx;
}; 