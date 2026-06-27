import axios from "axios"

export const resumeUpload = async (resumeFile) => {
    const formdata = new FormData()
    formdata.append("resume",resumeFile)
    
    try {
        const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/interview/upload`,
            formdata,
            {
                withCredentials: true,
            }
        );
        return result;
    } catch (error) {
        throw new Error("error in uploading resume..",error);    
    }
}