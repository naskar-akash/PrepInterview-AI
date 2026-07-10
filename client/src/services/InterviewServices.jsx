import axios from "axios";

export const resumeUpload = async (resumeFile) => {
  const formdata = new FormData();
  formdata.append("resume", resumeFile);

  try {
    const result = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/interview/upload`,
      formdata,
      {
        withCredentials: true,
      },
    );
    return result;
  } catch (error) {
    console.error(error.response?.data?.message || "Error uploading resume");
    throw error;
  }
};

export const generateQuestions = async (data) => {
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/interview/generate-questions`,
      data,
      {
        withCredentials: true,
      }
    );
    return result;
  } catch (error) {
    console.error(error.response?.data?.message || "Error generating questions");
    throw error;
  }
};

export const submitAnswer = async (data) => {
  try {
    const result = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/interview/submit-answer`,
      data,
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(error.response?.data?.message || "Error submitting answer");
    throw error;
  }
}
