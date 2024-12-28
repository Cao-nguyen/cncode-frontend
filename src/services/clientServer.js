import axios from "axios"

// API Đăng ký
export const checkCode = (email) => {
    return axios.post('http://localhost:8080/api/v1/xacthuc', {
        email
    })
}

// API Đăng ký
export const registerUser = (email, fullName, username, password, confirmPassword, code) => {
    return axios.post('http://localhost:8080/api/v1/dangky', {
        email, fullName, username, password, confirmPassword, code
    })
}