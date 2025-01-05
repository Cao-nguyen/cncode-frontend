import axios from "axios"

const backend = process.env.REACT_APP_BACKEND

// API xác thực
export const checkCode = async (email) => {
<<<<<<< Updated upstream
    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/v1/xacthuc`, { email });
=======
    const response = await axios.post(`${backend}/api/v1/xacthuc`, { email });
>>>>>>> Stashed changes
    return response.data
};

// API Đăng ký
export const registerUser = async (fullName, email, username, password, code) => {
<<<<<<< Updated upstream
    const response = await axios.post(`${process.env.REACT_APP_BACKEND}/api/v1/dangky`, {
=======
    const response = await axios.post(`${backend}/api/v1/dangky`, {
>>>>>>> Stashed changes
        fullName, email, username, password, code
    })
    return response.data
}

// API Đăng nhập
export const LoginUser = async (fullName, username, password) => {
<<<<<<< Updated upstream
    const response = await axios.post('https://cncode-backend.vercel.app/api/v1/dangnhap', {
=======
    const response = await axios.post(`${backend}/api/v1/dangnhap`, {
>>>>>>> Stashed changes
        fullName, username, password
    })
    return response.data
}
