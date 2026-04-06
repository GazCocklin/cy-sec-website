import React, { createContext, useContext, useState } from 'react';

const WidgetContext = createContext();

export const WidgetProvider = ({ children }) => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  return (
    <WidgetContext.Provider value={{ isWidgetOpen, setIsWidgetOpen }}>
      {children}
    </WidgetContext.Provider>
  );
};

export const useWidget = () => useContext(WidgetContext);