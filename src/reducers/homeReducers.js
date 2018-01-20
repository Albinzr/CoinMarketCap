import Store from '../store/homeStore';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
    switch (action.type) {

        case 'HOME_ERROR': {
            console.log("err")
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
            console.log("got data")
            debugger
            if (action.data) {
                return {
                    ...state,
                    loading: false,
                    numbers: action.data.numbers,
                    refresh: false
                };
            }
            return initialState;
        }
        case 'HOME_RESET': {
            console.log("data reset")
            return initialState;
        }
        default:
            return state;
    }
}
