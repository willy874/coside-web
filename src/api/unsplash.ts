import axios from 'axios'

const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID

const UNSPLASH_ROOT = 'https://api.unsplash.com'

export const getPhotosByQuery = async (query: string, page: number, limit: number) => {
  const { data } = await axios.get(
    `${UNSPLASH_ROOT}/search/photos?query=${query}&per_page=${limit}&page=${page}&client_id=${clientId}`
  )
  return data
}