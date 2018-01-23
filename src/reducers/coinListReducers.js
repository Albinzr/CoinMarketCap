import Store from '../store/coinListStore';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
    switch (action.type) {

        case 'COIN_LIST_ERROR': {
            if (action.data) {
                return {
                    ...state,
                    loading: false,
                    error: action.data,
                };
            }
            return initialState;
        }
        case 'COIN_LIST_RECIVED_COIN_NAME_DATA': {
            if (action.data) {
                return {
                    ...state,
                    loading: false,
                    coinNames: action.data,
                };
            }
            return initialState;
        }
        case 'COIN_LIST_CLOSE_SEARCH': {
            if (action.data) {
                return {
                    ...state,
                    loading: false,
                    showSearch: action.data.showSearch,
                };
            }
            return initialState;
        }
        case 'COIN_LIST_OPEN_SEARCH': {
            if (action.data) {
                return {
                    ...state,
                    loading: false,
                    showSearch: action.data.showSearch,
                };
            }
            return initialState;
        }


        case 'COIN_LIST_SEARCH_LIST': {
            if (action.data) {
                return {
                    ...state,
                    loading: false,
                    searchArray: action.data.searchArray,
                };
            }
            return initialState;
        }

        case 'COIN_LIST_LOADING': {
            if (action.data) {
                return {
                    ...state,
                    loadMore: action.data.loadMore,
                    isRefreshing: action.data.isRefreshing
                };
            }
            return initialState;
        }

        case 'COIN_LIST_RELOADING_DATA': {
            if (action.data) {
                return {
                    ...state,
                    coinsDetails: action.data.coinsDetails,
                    isRefreshing: action.data.isRefreshing
                };
            }
            return initialState;
        }

        case 'COIN_LIST_RECIVED_COIN_DETAILS_DATA': {
            if (action.data) {
                return {
                    ...state,
                    coinsDetails: action.data.coinsDetails,
                    isRefreshing: action.data.isRefreshing,
                    loadMore: action.data.loadMore,
                    start: action.data.start,
                    isRefreshing: action.data.isRefreshing
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
