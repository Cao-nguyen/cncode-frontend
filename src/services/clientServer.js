import axios from "axios"

const backend = process.env.REACT_APP_BACKEND

// API xác thực
export const checkCode = async (email) => {
    const response = await axios.post(`${backend}/api/v1/xacthuc`, { email });
    return response.data
}

// API Đăng ký
export const registerUser = async (fullName, email, username, password, code) => {
    const response = await axios.post(`${backend}/api/v1/dangky`, {
        fullName, email, username, password, code
    })
    return response.data
}

// API Đăng nhập
export const LoginUser = async (fullName, username, password) => {
    const response = await axios.post(`${backend}/api/v1/dangnhap`, {
        fullName, username, password
    })
    return response.data
}
