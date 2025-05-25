"use client"; 
import { createContext, useContext, useState } from "react";

interface LoginDialogProvider {
  openState: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const LoginDialogContext = createContext<LoginDialogProvider | undefined>(undefined);

export const useLoginDialog = () => {
  const context = useContext(LoginDialogContext);
  if (!context) {
    throw new Error("useLoginDialog must be used within a LoginDialogProvider");
  }
  return context;
};

interface LoginDialogProviderProps {
  children: React.ReactNode;
}

export const LoginDialogProvider = ({ children }: LoginDialogProviderProps) => {
  const [openState, setOpen] = useState(false);

  const openDialog = () => { 
    console.log("open");
    setOpen(true); 
  };
  const closeDialog = () => { 
    console.log("close");
    setOpen(false); 
  };
  return (
    <LoginDialogContext.Provider value={{ openState, openDialog, closeDialog }}>
      {children}
    </LoginDialogContext.Provider>
  );
};
