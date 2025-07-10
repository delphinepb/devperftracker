import axios from 'axios'

export const analyze = async (url: string) => {
  const token = localStorage.getItem('token')
  const response = await axios.post('/api/analyze', { url }, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export const fetchHistory = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get('/api/analyze', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export const fetchAnalysisById = async (id: number) => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`/api/analyze/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}
