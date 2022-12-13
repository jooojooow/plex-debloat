import { useToast } from 'vue-toast-notification'

const url = 'https://plex.tv/api/v2/'
const toast = useToast()

export const responseHandling = (response: Response) => {
  if (!response.ok) {
    toast.error('Oops.. something went wrong')
    throw new Error(response.statusText)
  }
  return response.json()
}

export const get = async <T>(path: string): Promise<T> => {
  const response = await fetch(url + path, { headers: { accept: 'application/json' } })
  return responseHandling(response)
}

export const post = async <T>(path: string, payload: object = {}): Promise<T> => {
  const response = await fetch(url + path, {
    method: 'POST',
    headers: { accept: 'application/json' },
  })
  return responseHandling(response)
}
