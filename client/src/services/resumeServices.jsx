import axios from "axios";

export async function uploadResume(resumeData) {
    try {
        const formData = new FormData()
        formData.append('resume', resumeData.file)
        formData.append('resumeTitle', resumeData.resumeTitle)
        formData.append('targetJobTitle', resumeData.targetJobTitle)
        formData.append('skillsFocus', resumeData.skillsFocus)
        
        return axios.post(`${import.meta.env.VITE_SERVER_URL}/resume/upload`, formData, {
          withCredentials: true
        })
    } catch (error) {
        throw error
    }
}