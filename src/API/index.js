import axiosInstance from "./axios.config";

export const Signup = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/signup", data);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

export const Login = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}