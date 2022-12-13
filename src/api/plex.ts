import { get, post } from './request'
import type { Pins, User } from './types'

export const generateCredentials = (product: string, identifier: string): Promise<Pins> => {
  return post<Pins>(`pins?strong=true&X-Plex-Product=${product}&X-Plex-Client-Identifier=${identifier}`)
}

export const getToken = (id: number, code: string, identifier: string): Promise<Pins> => {
  return get<Pins>(`pins/${id}?code=${code}&X-Plex-Client-Identifier=${identifier}`)
}

export const optOut = (user: number, key: string, authToken: string, product: string, identifier: string): Promise<User> => {
  return post<User>(`user/${user}/settings/opt_outs?key=${key}&value=opt_out&X-Plex-Token=${authToken}&X-Plex-Product=${product}&X-Plex-Client-Identifier=${identifier}`)
}

export const getUser = (product: string, identifier: string, authToken: string): Promise<User> => {
  return get<User>(`user?X-Plex-Product=${product}`
  + `&X-Plex-Client-Identifier=${identifier}&X-Plex-Token=${authToken}`)
}
