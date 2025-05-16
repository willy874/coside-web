'use client'
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

function CheckLoginPage() {
  const searchParams = useSearchParams()
  const { fetchLogin } = useAuth()

  useEffect(() => {
     const code = searchParams.get('code')
     if (!code) {
        return
     }
     fetchLogin({ code })
  }, [fetchLogin, searchParams])

  return (
    <div></div>
  )
}

export default CheckLoginPage
