import axios from 'axios'

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post('/api/auth/login', { username, password })

    const { token } = response.data
    localStorage.setItem('token', token)
    return token
  } catch (error: any) {
    const message = error.response?.data?.error || 'Erreur lors de la connexion'
    throw new Error(message)
  }
}
