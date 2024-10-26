import { endpoint } from '../config'

export type Payload = {
  limit: number
}

export type Response = {
  count: number;
  next: string;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[]
}

export const list = async (payload: Payload): Promise<Response> => {
  const response = await fetch(`${endpoint}pokemon?limit=${payload.limit}`)

  const json: Response = await response.json()
  return json
}
