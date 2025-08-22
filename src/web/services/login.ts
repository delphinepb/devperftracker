import axios from 'axios'

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post('/api/auth/login', { username, password })

    const { token } = response.data
    localStorage.setItem('token', token)

    const payloadBase64 = token.split('.')[1]
    const decodedPayload = JSON.parse(atob(payloadBase64))

    const role = decodedPayload.role
    localStorage.setItem('role', role)

    return { token, role }
  } catch (error: any) {
    const message = error.response?.data?.error || 'Erreur lors de la connexion'
    throw new Error(message)
  }
}
