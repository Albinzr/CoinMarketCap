import Store from '../store/homeStore';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
    switch (action.type) {

        case 'HOME_ERROR': {
            if (action.data) {
                return {
                    ...state,
                    loading: false,
                    error: action.data,
                };
            }
            return initialState;
        }
        case 'HOME_RECIVED_DATA': {
            if (action.data) {
                return {
                    ...state,
                    loading: false,
                    numbers: action.data.numbers,
                };
            }
            return initialState;
        }
        case 'HOME_RESET': {
            return initialState;
        }
        default:
            return state;
    }
}
