import axios from 'axios'

export const analyze = async (url: string) => {
  try {
    const response = await axios.post('/api/analyze', { url })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Erreur inconnue")
  }
}
