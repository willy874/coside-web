import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLoginStore = create(
  persist(
    (set) => ({
      token: null, // 用來儲存 token
      userInfo: null, // 用來儲存使用者資訊
      isAuthenticated: false, // 用來儲存使用者是否登入的狀態
      // 設置 token 並將登入狀態設為 true
      setUserInfo: (token, userInfo) => set({ token, userInfo, isAuthenticated: !!token }),
      // 清除 token 並將登入狀態設為 false
      clearUserInfo: () => set({ token: null, userInfo: null, isAuthenticated: false }),
    }),
    {
      name: "loginState",
      getStorage: () => localStorage,
    }
  )
)


export default useLoginStore;