export const LOGIN_USER = 'LOGIN_USER'

export const Login = (data) => {
    return {
        type: LOGIN_USER,
        payload: data
    }
}