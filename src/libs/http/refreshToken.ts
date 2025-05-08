import axios from "axios";
import type { NextRequest } from "next/server";
import { API_SERVER_URL, IS_DEV } from "@/constant";

export function requestQueueFactory<Key, Context, Req, Res>(
  createContext: (req: Req, resolve: (res: Res) => void, reject: (error: unknown) => void) => Context,
  resolveQueue: (queue: Context[]) => Promise<void>,
): (key: Key, request: Req) => Promise<Res> {
  type ContextInfo = {
    queue: Context[]
    isRefreshing: boolean
  }
  const contextDict = new Map<Key, ContextInfo>()
  return (key, request) => {
    if (!contextDict.has(key)) {
      contextDict.set(key, {
        queue: [],
        isRefreshing: false,
      })
    }
    const info = contextDict.get(key)
    if (!info) {
      throw new Error('Context not found')
    }
    if (!info.isRefreshing) {
      resolveQueue(info.queue)
        .finally(() => {
          info.isRefreshing = false
          info.queue = []
          contextDict.delete(key)
        })
        info.isRefreshing = true
    }
    return new Promise<Res>((resolve, reject) => {
      info.queue.push(createContext(request, resolve, reject))
    })
  }
}


interface RefreshTokenResponse {
  success: boolean,
  message: string,
  data: {
    accessToken: string,
  }
}

const fetchRefreshToken = async (info: {
  accessToken: string
  refreshToken: string
}) => {
  const response = await axios.request({
    baseURL: API_SERVER_URL,
    method: 'POST',
    url: '/auth/refresh',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${info.accessToken}`,
    },
    data: { refreshToken: info.refreshToken },
  })
  return response.data as RefreshTokenResponse
}

export async function onTokenExpiredCheck(request: NextRequest) {
  if (!request.headers.get('cookie')) {
    return
  }
  if (request.headers.get('authorization')) {
    return
  }
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const refreshToken = cookieStore.get('refresh_token')?.value
  if (!accessToken || !refreshToken) {
    return
  }
  const onTokenExpired = requestQueueFactory(
    (_req: null, resolve: (res: null) => void, reject) => ({ resolve, reject }),
    async (queue) => {
      try {
        const result = await fetchRefreshToken({ accessToken, refreshToken })
        // set
      } catch (error) {
        // remove
      }
    }
  )
  // if (isJwtTokenExpired(accessToken, 60_000)) {
  //   if (isJwtTokenExpired(refreshToken)) {
  //     await onTokenExpired(refreshToken, null)
  //     return
  //   }
  // }
}
