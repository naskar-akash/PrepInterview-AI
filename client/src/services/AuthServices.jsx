import axios from "axios"


export async function signupUser(data) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/signup`,
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

export async function loginUser(data) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`,
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
        const response = await axios.post(`/api/auth/logout`, {}, { withCredentials: true });
        return response;
    } catch (error) {
        throw error;
    }
}
