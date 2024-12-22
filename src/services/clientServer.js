import axios from "axios"

// API Đăng ký
export const registerUser = (email, fullName, username, password, code) => {
    return axios.post('http://localhost:8080/api/v1/dangky', {
        email, fullName, username, password, code
    })
}

// API Xác thực Mail
export const codeMail = (email) => {
    return axios.post('http://localhost:8080/api/v1/xacthuc', {
        email
    })
}

// API Lấy lại mật khẩu
export const forgotPassword = (fullName, email, username, password) => {
    return axios.post('http://localhost:8080/api/v1/quenmatkhau', {
        fullName, email, username, password
    })
}

// API Đăng nhập
export const login = (fullName, username, password) => {
    return axios.post('http://localhost:8080/api/v1/dangnhap', {
        fullName, username, password
    })
}