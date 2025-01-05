import axios from "axios"

const backend = process.env.REACT_APP_BACKEND

// Giới thiệu
export const InforApi = async (Infor) => {
<<<<<<< Updated upstream
    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/v1/infor`, { Infor });
=======
    const response = await axios.post(`${backend}/api/v1/infor`, { Infor });
>>>>>>> Stashed changes
    return response.data
};

// Giới thiệu
export const getInforApi = async () => {
<<<<<<< Updated upstream
    const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/v1/infor`);
=======
    const response = await axios.get(`${backend}/api/v1/infor`);
>>>>>>> Stashed changes
    return response.data
};
