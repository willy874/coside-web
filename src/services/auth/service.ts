import { API_SERVER_URL, IS_SERVER } from "@/constant";
import axios from "axios";

interface AuthExchangeRequestDTO {
  code: string
}

interface AuthExchangeResponseDTO {
  success: boolean,
  message: string,
  data: {
    access_token: string,
    refresh_token: string,
    name: string,
    email: string,
    isAlreadyUser: boolean
  }
}

export const fetchAuthExchange = async ({ code }: AuthExchangeRequestDTO): Promise<AuthExchangeResponseDTO> => {
  const instance = axios.create()
  if (!IS_SERVER) {
    throw new Error('This function can only be used in server side')
  }
  const response = await instance.request({
    baseURL: API_SERVER_URL,
    method: 'POST',
    url: '/auth/exchange',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { code },
  })
  return response.data
}

interface SignupRequestDTO {
  accessToken: string
  user: {
    name: string
    email: string
    emailPublic: boolean
    facebook: string
    isfacebookpublic: boolean
    instagram: string
    isinstagrampublic: boolean
    role: string
    otherRole: string
    intro: string
    link: string
    avatar: string
    password: string
  }
}

interface SignupResponseDTO {
  data: {
    accessToken: string
    refreshToken: string
  },
  message: string
}

export const fetchSignup = async (data: SignupRequestDTO): Promise<SignupResponseDTO> => {
  const instance = axios.create()
  if (!IS_SERVER) {
    throw new Error('This function can only be used in server side')
  }
  const response = await instance.request({
    baseURL: API_SERVER_URL,
    method: 'POST',
    url: '/auth/signup',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.accessToken}`,
    },
    data: data.user,
  })
  return response.data
}