import axios from "axios"

// [POST] CreateNew
export const CreateNew = async (title, isChecked, show, description, content, fullName) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/v1/news/create`, {
        title, isChecked, show, description, content, fullName
    });
    return response.data
};

// [PACTH] EditNew
export const EditNew = async (id, title, description, isChecked, show, content) => {
    const response = await axios.patch(`${process.env.REACT_APP_BACKEND}/api/v1/news/edit/${id}`, {
        id, title, description, isChecked, show, content
    });
    return response.data
};

// [GET] ShowNew
export const ShowNew = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/v1/news/show`);
    return response.data
};

// [PATCH] Giới thiệu
export const InforApi = async (Infor) => {
    const response = await axios.patch(`${process.env.REACT_APP_BACKEND}/api/v1/infor`, {
        Infor
    });
    return response.data
};

// [GET] Giới thiệu
export const getInforApi = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/v1/infor`);
    return response.data
};
