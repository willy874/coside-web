'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { fetchLogin, fetchLogout } from "@/services/auth";
import { AuthContext } from "@/contexts/AuthContext";
import { clearGetUser, invalidateGetUser, useGetUserQuery } from "@/services";

interface AuthProviderProps {
  accessToken?: string
  children: React.ReactNode
}

function AuthProvider({ accessToken, children }: AuthProviderProps) {
  const [isLogin, setIsLogin] = useState(!!accessToken)
  const router = useRouter()
  useGetUserQuery({ enabled: isLogin })

  const { mutateAsync: onLogout } = useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      setIsLogin(false)
      clearGetUser()
    },
  })

  const { mutateAsync: onLogin } = useMutation({
    mutationFn: fetchLogin,
    onSuccess: async (res) => {
      if (res.data.isAlreadyUser) {
        await invalidateGetUser()
        setIsLogin(true)
      }
      router.replace(res.data.loginRedirectUrl || '/')
    },
    onError: () => {
      router.replace('/')
    }
  })

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        fetchLogin: onLogin,
        fetchLogout: onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
