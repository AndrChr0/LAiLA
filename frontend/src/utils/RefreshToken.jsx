import axios from 'axios'

// utility function to refresh the user's access token
async function RefreshToken() {
    try {
        const response = await axios.get("http://localhost:5310/api/auth/refresh")
        const jwt = response
        return jwt
    } catch (error) {
        return null
    }
}

export default RefreshToken