import Store from '../store/coinDetailStore';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'COIN_DETAIL_LOADING': {
            if (action.data) {
                return {
                    ...state,
                    isLoading: action.data.isLoading,
                };
            }
            return initialState;
        }
        case 'COIN_DETAILS_RECIVED_DATA': {
            if (action.data) {
                return {
                    ...state,
                    isLoading: action.data.isLoading,
                    coinDetails: action.data.coinDetails,
                };
            }
            return initialState;
        }
        case 'COIN_DETAIL_GRAPH_DATA': {
            if (action.data) {
                return {
                    ...state,
                    price: action.data.price,
                    volume: action.data.volume,
                    marketCap: action.data.marketCap,
                    graphLimit: action.data.graphLimit,
                    isLoading: action.data.isLoading,
                    isRefreshing: action.data.isRefreshing,

                };
            }
            return initialState;
        }

        case 'COIN_DETAILS_RESET': {
            return initialState;
        }
        default:
            return state;
    }
}
