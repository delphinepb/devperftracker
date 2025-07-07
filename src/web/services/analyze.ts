import axios from 'axios'

export const analyze = async (url: string) => {
  try {
    const response = await axios.post('/api/analyze', { url })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Erreur inconnue")
  }
}

export const fetchHistory = async () => {
  const response = await axios.get('/api/history')
  return response.data
}

export const fetchAnalysisById = async (id: number) => {
  const response = await axios.get(`/api/analyze/${id}`)
  return response.data
}