import { DANG_KY } from '../Actions/userAction'

const INITIAL_STATE = {
    account: {
        fullname: '',
        email: '',
        username: '',
        password: '',
        role: '',

    },
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.style) {
        case DANG_KY:
            return {
                ...state, account: {
                    fullname: action?.payload?.DT?.fullname,
                    email: action?.payload?.DT?.email,
                    username: action?.payload?.DT?.username,
                    password: action?.payload?.DT?.password,
                    role: action?.payload?.DT?.role,
                }
            }

        default: return state
    }
}

export default userReducer