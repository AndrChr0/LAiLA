import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5310/',
    withCredentials: true,
  });
// utility function to refresh the user's access token
async function RefreshToken() {
    try {
        const response = await instance.get("api/auth/refresh")
        const jwt = response
        return jwt
    } catch (error) {
        console.error("Failed to refresh token", error)
        return null
    }
}

export default RefreshToken