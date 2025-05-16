import { queryOptions, skipToken, useSuspenseQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { userClient as client } from '@/resources'
import { getQueryClient } from '@/libs/queryClient'
import { getUser } from '@/resources/user/getUser'

type ApiResource = typeof getUser

export type GetUserResponseDTO = z.infer<ApiResource['responses'][200]>

export const GET_USER_QUERY = ['getUser'] as const

const fetchFn = async (): Promise<GetUserResponseDTO> => {
  const res = await client.getUser()
  if (res.status === 200) return res.body
  throw res.body
}

interface QueryOptions {
  enabled?: boolean
}

const getQueryOptions = ({ enabled }: QueryOptions = {}) => {
  return queryOptions({
    queryKey: GET_USER_QUERY,
    queryFn: enabled ? () => fetchFn() : () => null,
  } as const)
}

export const useGetUserQuery = (options: QueryOptions = {}) => {
  return useSuspenseQuery(getQueryOptions(options))
}

export async function prefetchGetUser() {
  const queryClient = getQueryClient()
  const queryOptions = getQueryOptions()
  // queryOptions.staleTime = 0
  await queryClient.prefetchQuery(queryOptions)
  const result = queryClient.getQueryData(queryOptions.queryKey)
  return result
}

export async function invalidateGetUser() {
  const queryClient = getQueryClient()
  await queryClient.invalidateQueries({ queryKey: GET_USER_QUERY })
  const result = queryClient.getQueryData(GET_USER_QUERY)
  return result
}

export async function clearGetUser() {
  const queryClient = getQueryClient()
  queryClient.removeQueries({ queryKey: GET_USER_QUERY })
}
