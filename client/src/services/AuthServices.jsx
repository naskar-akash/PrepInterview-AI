import axios from "axios"


export async function googleAuthUser(data) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/google_auth`,
            data,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
}

export async function logoutUser() {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/logout`,{}, { withCredentials: true });
        return response;
    } catch (error) {
        throw error;
    }
}
