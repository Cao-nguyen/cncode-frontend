export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export const logoutUser = () => ({
    type: LOGOUT_USER,
});


export const Login = (data) => {
    return {
        type: LOGIN_USER,
        payload: data
    }
}