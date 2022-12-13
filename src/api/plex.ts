import { get, post } from './request'
import type { Pins, User } from './types'
import client from '~/client'

const defaultOptions = `&X-Plex-Product=${client.appName}&X-Plex-Client-Identifier=${client.clientId}`

export const generateCredentials = (): Promise<Pins> => {
  return post<Pins>(`pins?${defaultOptions}&strong=true`)
}

export const getToken = (id: number, code: string): Promise<Pins> => {
  return get<Pins>(`pins/${id}?${defaultOptions}&code=${code}`)
}

export const optOut = (user: string, key: string, authToken: string): Promise<any> => {
  return post<any>(`user/${user}/settings/opt_outs?${defaultOptions}&key=${key}&value=opt_out&X-Plex-Token=${authToken}`)
}

export const getUser = (authToken: string): Promise<User> => {
  return get<User>(`user?${defaultOptions}&X-Plex-Token=${authToken}`)
}
