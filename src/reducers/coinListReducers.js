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
        case 'COIN_LIST_SORT': {
            if (action.data) {
                return {
                    ...state,
                    showSortOptions: action.data.showSortOptions,
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

        case 'COIN_LIST_SCROLL_TO_TOP': {
            if (action.data) {
                return {
                    ...state,
                    shouldScrollToTop: action.data.shouldScrollToTop
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
                    isLoading: action.data.isLoading,
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
                    isLoading: action.data.isLoading,
                    sort: action.data.sort
                };
            }
            return initialState;
        }
        case 'COIN_LIST_UPDATE_COIN_DETAILS_DATA': {
            if (action.data) {
                return {
                    ...state,
                    coinsDetails: action.data.coinsDetails,
                    isRefreshing: false,
                    isLoading: false,
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
