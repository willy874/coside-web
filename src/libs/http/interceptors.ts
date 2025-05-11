import { z } from 'zod'
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export function serverAuthorizationPlugin() {
  return (instance: AxiosInstance) => {
    instance.interceptors.request.use(async (config) => {
      const { cookies, headers } = await import('next/headers')
      let Authorization = null
      try {
        const accessTokenByHeader = headers().get('Authorization')
        if (accessTokenByHeader) {
          Authorization = headers().get('Authorization')
        }
        const accessTokenByCookie = cookies().get('access_token')?.value
        if (accessTokenByCookie) {
          Authorization = `Bearer ${accessTokenByCookie}`
        }
        if (config.headers['Authorization']) {
          Authorization = config.headers['Authorization']
        }
      } catch {}
      config.headers['Authorization'] = Authorization
      const referer = headers().get('referer')
      if (referer) {
        config.baseURL = referer
      } 
      return config
    })
  }
}

export function requestValidationPlugin(schema: z.ZodType) {
  return (instance: AxiosInstance) => {
    instance.interceptors.request.use((config) => {
      const data = ['POST', 'PUT', 'PATCH'].includes(config.method || 'get') ? config.data : config.params
      const result = schema.safeParse(data)
      if (result.success) {
        return result as unknown as AxiosRequestConfig['data']
      }
      else {
        console.warn('requestSchema', result.error.format())
      }
      return config
    })
  }
}

export function responseValidationPlugin(schema: z.ZodType) {
  return (instance: AxiosInstance) => {
    instance.interceptors.response.use((response) => {
      const result = schema.safeParse(response.data)
      if (result.success) {
        return result as unknown as AxiosResponse<z.infer<z.ZodAny>>
      }
      else {
        console.warn('responseSchema', result.error.format())
      }
      return response
    })
  }
}

