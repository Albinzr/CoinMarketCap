import Store from '../store/favouriteCoinStore'

export const initialState = Store;

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'FAVOURITE_COIN_LOADING': {
            if (action.data) {
                return {
                    ...state,
                    isLoading: action.data.isLoading,
                };
            }
            return initialState;
        }
        case 'FAVOURITE_COIN_RECIVED_DATA': {
            if (action.data) {
                return {
                    ...state,
                    isLoading: action.data.isLoading,
                    favCoins: action.data.favCoins,
                };
            }
            return initialState;
        }
        case 'SELECTED_FAVOURITE_COIN_DETAIL_DATA': {
            if (action.data) {
                return {
                    ...state,
                    isLoading: action.data.isLoading,
                    selectedFavCoins: action.data.selectedFavCoins
                };
            }
            return initialState;
        }

        case 'FAVOURITE_COIN_RESET': {
            return initialState;
        }
        default:
            return state;
    }
}
