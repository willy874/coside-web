/**
 * @path /api/auth/register
 */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { fetchSignup, RegisterRequestDTO, RegisterResponseDTO } from "@/services/auth";
import { ACCESS_TOKEN_EXPIRE_TIME, IS_DEV, REFRESH_TOKEN_EXPIRE_TIME } from "@/constant";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const signupToken = request.cookies.get('signup_token')?.value
  if (!signupToken) {
    return new NextResponse('Token not Found!', { status: 403 })
  }
  const data: RegisterRequestDTO = await request.json()
  const response = await fetchSignup({
    accessToken: signupToken,
    user: data
  })
  console.log('/api/auth/register', response.data);

  cookieStore.delete('signup_token')
  cookieStore.delete('signup_name')
  cookieStore.delete('signup_email')
  cookieStore.set('access_token', response.data.accessToken, {
    httpOnly: true,
    maxAge: ACCESS_TOKEN_EXPIRE_TIME,
    path: '/',
    secure: !IS_DEV,
  })
  cookieStore.set('refresh_token', response.data.refreshToken, {
    httpOnly: true,
    maxAge: REFRESH_TOKEN_EXPIRE_TIME,
    path: '/',
    secure: !IS_DEV,
  })
  const url = cookieStore.get('login_redirect_url')?.value
  return NextResponse.json({
    massage: 'Register Success!',
    data: {
      loginRedirectUrl: url || '/'
    }
  } satisfies RegisterResponseDTO)
}