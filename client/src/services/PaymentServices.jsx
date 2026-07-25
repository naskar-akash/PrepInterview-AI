import axios from "axios";

export const createOrder = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/payment/create-order`,
      data,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || "Error creating order");
    throw error;
  }
};

export const verifyPayment = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/payment/verify-order`,
      data,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || "Error verifying payment");
    throw error;
  }
};
