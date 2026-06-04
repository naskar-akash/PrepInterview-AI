import axios from 'axios';


export async function getCurrentUser() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/current_user`,
            {
                withCredentials: true,
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
}