import axiosInstance from "../src/config/axiosConfig";

export const fileUpload = async (formData) => {
  try {
    const response = await axiosInstance.post("/upload", formData);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
