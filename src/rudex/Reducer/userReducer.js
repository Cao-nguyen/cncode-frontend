import { DANG_KY } from '../Actions/userAction';

const INITIAL_STATE = {
    account: {
        email: '',
        fullName: '',
    },
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DANG_KY:
            console.log(action)
            return {
                ...state,
                account: {
                    email: action?.payload?.DT?.email,
                    fullName: action?.payload?.DT?.fullName,
                }
            };

        default:
            return state;
    }
};

export default userReducer;
