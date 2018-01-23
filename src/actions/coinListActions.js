import apiManager from '../api/apiManager'
//
export const loadAllCoinNames = () => {
    return dispatch => new Promise(async (resolve, reject) => {
        apiManager.getAllCoinNames().then(data => {
            resolve(dispatch({
                type: 'COIN_LIST_RECIVED_COIN_NAME_DATA',
                data: data,
            }))
        })
    })
}

export const closeSearch = () => {
    return dispatch => new Promise(resolve => resolve(dispatch({
        type: 'COIN_LIST_CLOSE_SEARCH',
        data: { showSearch: false },
    })));
}

export const searchFilter = (key, coinNames, showSearch = true) => {
    return dispatch => new Promise(async (resolve, reject) => {
        if (!showSearch) {
            resolve(dispatch({
                type: 'COIN_LIST_OPEN_SEARCH',
                data: { showSearch: true },
            }))
        }
        const searchArray = coinNames.filter(function (item) {
            const itemData = item.name.toUpperCase()
            const textData = key.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        resolve(dispatch({
            type: 'COIN_LIST_SEARCH_LIST',
            data: { searchArray: searchArray },
        }))
    })
}

export const getCoins = (start, limit, coinsDetails, loadMore = true, isRefreshing = false, currency = "USD") => {
    return dispatch => new Promise(async (resolve, reject) => {
        if (isRefreshing) {
            resolve(dispatch({
                type: 'COIN_LIST_LOADING',
                data: {
                    isRefreshing: true
                },
            }))
            loadMore = true
            coinsDetails = []
        }
        if (loadMore) {
            resolve(dispatch({
                type: 'COIN_LIST_LOADING',
                data: {
                    loadMore: false,
                    isRefreshing: true
                },
            }))
            apiManager.getCoins(start, limit, currency).then(data => {
                if (data.length == limit) {
                    return resolve(dispatch({
                        type: 'COIN_LIST_RECIVED_COIN_DETAILS_DATA',
                        data: {
                            coinsDetails: coinsDetails.concat(data),
                            loadMore: true,
                            start: start + limit,
                            isRefreshing: false
                        },
                    }))

                } else {
                    resolve(dispatch({
                        type: 'COIN_LIST_RECIVED_COIN_DETAILS_DATA',
                        data: {
                            coinsDetails: coinsDetails.concat(data),
                            loadMore: false,
                            start: start,
                            isRefreshing: false
                        },
                    }))

                }
            })
            return
        }
    })
}
