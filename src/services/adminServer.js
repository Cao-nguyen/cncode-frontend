import axios from "axios"

const backend = process.env.REACT_APP_BACKEND

// Giới thiệu
export const InforApi = async (Infor) => {
    const response = await axios.post(`${backend}/api/v1/infor`, { Infor });
    return response.data
};

// Giới thiệu
export const getInforApi = async () => {
    const response = await axios.get(`${backend}/api/v1/infor`);
    return response.data
};
