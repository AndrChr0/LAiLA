import instance from "./axiosInstance"
// utility function to refresh the user's access token
async function refreshToken() {
    try {
        const response = await instance.get("api/auth/refresh")
        const jwt = response
        return jwt
    } catch (error) {
        console.error("Failed to refresh token", error)
        return null
    }
}

export default refreshToken