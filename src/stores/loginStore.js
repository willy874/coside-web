import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLoginStore = create(
  persist(
    (set) => ({
      token: null, // 用來儲存 token
      isAuthenticated: false, // 用來儲存使用者是否登入的狀態
      // 設置 token 並將登入狀態設為 true
      setToken: (token) => set({ token: token, isAuthenticated: !!token }),
      // 清除 token 並將登入狀態設為 false
      clearToken: () => set({ token: null, isAuthenticated: false }),
    }),
    {
      name: "loginState",
      getStorage: () => localStorage,
    }
  )
)


export default useLoginStore;