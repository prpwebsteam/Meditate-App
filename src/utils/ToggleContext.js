import React, { createContext, useState, useContext } from 'react';

const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <ToggleContext.Provider value={{ isEnabled, setIsEnabled }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => useContext(ToggleContext);
