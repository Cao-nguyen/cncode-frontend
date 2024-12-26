import { DANG_KY } from '../Actions/userAction';

const INITIAL_STATE = {
    account: {
        email: '',
        fullName: '',
        tokenUser: ''
    }
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DANG_KY:
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
