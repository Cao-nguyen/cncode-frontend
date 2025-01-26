import axios from "axios"

// API Tin tức unlike
export const NewsUnlike = async (fullName, slug) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/v1/news/client/unlike`, {
        fullName, slug
    });
    return response.data
}

// API Tin tức like
export const NewsLike = async (fullName, slug) => {
    const response = await axios.patch(`${process.env.REACT_APP_BACKEND}/api/v1/news/client/like`, {
        fullName, slug
    });
    return response.data
}

// API Tin tức
export const ShowNewClient = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/v1/news/client/show`);
    return response.data
}

// API xác thực
export const checkCode = async (email) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/v1/xacthuc`, { email });
    return response.data
}

// API quên mật khẩu
export const forgotCheck = async (email, code, password) => {
    const response = await axios.patch(`${process.env.REACT_APP_BACKEND}/api/v1/forgot`, { email, code, password });
    return response.data
}

// API Đăng ký
export const registerUser = async (fullName, email, username, password, code) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/v1/dangky`, {
        fullName, email, username, password, code
    })
    return response.data
}

// API Đăng nhập
export const LoginUser = async (fullName, username, password) => {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/v1/dangnhap`, {
        fullName, username, password
    })
    return response.data
}
