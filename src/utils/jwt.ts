export function jwtDecode(token: string) {
  const payload = token.split('.')[1]
  const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8')
  return JSON.parse(decodedPayload)
}

export function expToMaxAge(token: string) {
  const payload = jwtDecode(token) as { exp: number }
  const now = Math.floor(Date.now())
  return payload.exp * 1000 - now
}

export function isJwtTokenExpired(token: string, early = 0) {
  const payload = jwtDecode(token) as { exp: number }
  return payload.exp * 1000 + early < Date.now()
}
