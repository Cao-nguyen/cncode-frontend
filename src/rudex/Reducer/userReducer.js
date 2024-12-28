import { LOGIN_USER } from '../Actions/userAction';

const INITIAL_STATE = {
    account: {
        email: '',
        fullName: '',
        tokenUser: ''
    }
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                account: {
                    email: action?.payload?.DT?.email,
                    fullName: action?.payload?.DT?.fullName,
                    tokenUser: action?.payload?.DT?.tokenUser
                }
            };

        default:
            return state;
    }
};

export default userReducer;
