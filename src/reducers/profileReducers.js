import Store from '../store/profileStore';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
    switch (action.type) {

        case 'PROFILE_ERROR': {
            if (action.data) {
                return {
                    ...state,
                    loading: false,
                    error: action.data,
                };
            }
            return initialState;
        }
        case 'PROFILE_SHOW_USER_REGISTERED': {
            if (action.data) {
                return {
                    ...state,
                    loading: false,
                    isRegistered: action.data.isRegistered,
                    username: action.data.username,
                    email: action.data.email
                };
            }
            return initialState;
        }

        case 'PROFILE_SHOW_USER_REGISTERATION': {
            if (action.data) {
                return {
                    ...state,
                    loading: false,
                    isRegistered: action.data.isRegistered,
                };
            }
            return initialState;
        }


        case 'PROFILE_SHOW_USER_REGISTERED': {
            if (action.data) {
                return {
                    ...state,
                    loading: false,
                    isRegistered: action.data.isRegistered,
                };
            }
            return initialState;
        }


        case 'PROFILE_RESET': {
            return initialState;
        }
        default:
            return state;
    }
}
