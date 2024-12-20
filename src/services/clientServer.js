import axios from "axios"

export const registerUser = (email, fullName, username, password) => {
    return axios.post('http://localhost:8080/api/v1/dangky', {
        email, fullName, username, password
    })
}