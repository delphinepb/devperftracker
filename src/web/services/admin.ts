import axios from 'axios'

export const fetchAllAnalyses = async () => {
  const token = localStorage.getItem('token')
  const res = await axios.get('/api/analyze/admin', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.data
}

export const fetchAnalysisById = async (id: number) => {
  const token = localStorage.getItem('token')
  const res = await axios.get(`/api/analyze/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.data
}
