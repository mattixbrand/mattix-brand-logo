import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextType {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  isNavVisible: boolean;
  setNavVisible: (visible: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const [currentSection, setCurrentSection] = useState("overview");
  const [isNavVisible, setNavVisible] = useState(true);

  return (
    <NavigationContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        isNavVisible,
        setNavVisible,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
