import { createContext, useContext } from "react";

export const AuthContext = createContext({
  isLogin: false,
  fetchLogin: (params: { code: string }): Promise<unknown> => {
    throw new Error("Function not implemented.");
  },
  fetchLogout: (): Promise<unknown> => {
    throw new Error("Function not implemented.");
  },
})

export const useAuth = () => useContext(AuthContext)
