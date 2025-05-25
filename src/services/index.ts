import { GET_USER_QUERY } from './user/getUser'
import { GET_PROJECTS_QUERY, GET_PROJECTS_INFINITY_QUERY } from './project/getProjects'

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: typeof GET_USER_QUERY | typeof GET_PROJECTS_QUERY | typeof GET_PROJECTS_INFINITY_QUERY | string[]
  }
}

export * from './user/getUser'
