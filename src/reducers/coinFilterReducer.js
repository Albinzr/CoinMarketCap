import Store from '../store/coinFilterStore';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
    switch (action.type) {


        case 'COIN_LIST_RECIVED_SORTED_DETAILS': {
            if (action.data) {
                return {
                    ...state,
                    sortedCoinsDetails: action.data.sortedCoinsDetails,
                };
            }
            return initialState;
        }
        case 'COIN_LIST_RESET': {
            return initialState;
        }

        default:
            return state;
    }
}
