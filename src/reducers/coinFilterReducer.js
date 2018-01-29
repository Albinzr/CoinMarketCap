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
        case 'COIN_LIST_UPDATE_SEGMENT': {
            if (action.data) {
                return {
                    ...state,
                    selectedSegment: action.data.selectedSegment,
                };
            }
            return initialState;
        }
        case 'COIN_LIST_UPDATE_TOP_GAINER': {
            if (action.data) {
                return {
                    ...state,
                    topGainer: action.data.topGainer,
                };
            }
            return initialState;
        }

        case 'COIN_LIST_UPDATE_TOP_LOSER': {
            if (action.data) {
                return {
                    ...state,
                    topLoser: action.data.topLoser,
                };
            }
            return initialState;
        }



        default:
            return state;
    }
}

