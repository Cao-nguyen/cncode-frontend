import axios from "axios"

// Giới thiệu
export const InforApi = async (Infor) => {
    const response = await axios.post('http://localhost:8080/api/v1/infor', { Infor });
    return response.data
};

// Giới thiệu
export const getInforApi = async () => {
    const response = await axios.get('http://localhost:8080/api/v1/infor');
    return response.data
};