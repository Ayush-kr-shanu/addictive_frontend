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
};

export const User = async (id, token) => {
  try {
    const response = await axiosInstance.get(`/auth/user/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during user fetch:", error);
    throw error;
  }
};

export const UpdateUser = async (id, data, token) => {
  try {
    const response = await axiosInstance.patch(`/auth/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during user update:", error);
    throw error;
  }
};

export const Post = async (data, token) => {
  try {
    const response = await axiosInstance.post("/post", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during post creation:", error);
    throw error;
  }
};

export const GetPosts = async (token) => {
  try {
    const response = await axiosInstance.get("/post",{
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during post fetch:", error);
    throw error;
  }
};

export const GetPostByUser = async (userId, token) => {
  try {
    const response = await axiosInstance.get(`/post/${userId}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during post fetch:", error);
    throw error;
  }
}

export const Updatepost = async (id, data, token) => {
  try {
    const response = await axiosInstance.patch(`/post/:${id}`,data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during post update:", error);
    throw error;
  }
}

export const DeletePost = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during post deletion:", error);
    throw error;
  }
}

export const UploadFile = async (formData, token) => {
  try {
    const response = await axiosInstance.post("/file", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
}