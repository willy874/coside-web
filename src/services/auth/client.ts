import { http } from "@/libs/http/client";
import { AxiosResponse } from "axios";

export interface LoginRequestDTO {
  code: string
}

export interface LoginResponseDTO {
  message: string
  data: {
    isAlreadyUser: boolean
    loginRedirectUrl: string
  }
}

export function fetchLogin({ code }: LoginRequestDTO): Promise<LoginResponseDTO> {
  return http().request({
    url: '/api/auth/login',
    method: 'POST',
    data: { code }
  }).then((res) => res.data as any)
}

export function fetchPreLogin() {
  return http().request({
    url: '/api/auth/prelogin',
    method: 'POST',
  }).then((res) => res.data as any)
}

export interface RegisterRequestDTO {
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

export interface RegisterResponseDTO {
  massage: string
  data: {
    loginRedirectUrl: string
  }
}

export function fetchRegister(dto: RegisterRequestDTO): Promise<AxiosResponse<RegisterResponseDTO>> {
  return http().request({
    url: '/api/auth/register',
    method: 'POST',
    data: dto,
  }).then((res) => res.data as any)
}

export function fetchLogout() {
  return http().request({
    method: "POST",
    url: "/api/auth/logout",
  }).then((res) => res.data as any)
}

export function fetchRefreshToken() {
  return http().request({
    url: '/api/auth/refresh',
    method: 'POST',
  }).then((res) => res.data as any)
}
