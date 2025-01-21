import axios from "axios"

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
