import axios from "axios"

// API Đăng ký
export const registerUser = (email, fullName, username, password) => {
    return axios.post('http://localhost:8080/api/v1/dangky', {
        email, fullName, username, password
    })
}

// API Xác thực Mail
export const codeMail = (email) => {
    return axios.post('http://localhost:8080/api/v1/xacthuc', {
        email
    })
}