"use client";

import { createContext, useContext, useState } from "react";

interface AppContextType {
  authModal: boolean;
  toggleAuthModal: (value: boolean) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};


export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authModal, toggleAuthModal] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ authModal, toggleAuthModal }}>
      {children}
    </AppContext.Provider>
  );
}
