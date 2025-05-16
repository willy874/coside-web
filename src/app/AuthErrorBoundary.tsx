'use client'
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { isHttpError } from "@/libs/http/HttpError";
import { fetchLogout } from "@/services/auth";

function fallbackRender({ error }: { error: Error; resetErrorBoundary: () => void }) {
  const router = useRouter()

  useEffect(() => {
    const cleanup = () => {}
    if (isHttpError(error) && error.response) {
      if (error.options.redirectUrl) {
        router.replace(error.options.redirectUrl)
        return cleanup
      }
      if (error.response.status === 401 || error.response.status === 403) {
        fetchLogout().then(() => {
          router.replace('/')
        })
        return cleanup
      }
    }
  }, [error])
  if (isAxiosError(error)) {
    return <div>{error.message}</div>
  }
  throw error
}

interface AuthErrorBoundaryProps {
  children: React.ReactNode
}

function AuthErrorBoundary({ children }: AuthErrorBoundaryProps) {
  return <ErrorBoundary fallbackRender={fallbackRender}>{children}</ErrorBoundary>
}

export default AuthErrorBoundary;
