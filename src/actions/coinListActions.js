import apiManager from '../api/apiManager'
import sort from '../constants/sortConstant'
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
export const sortToggle = (showSortOptions) => {
    return dispatch => new Promise(async (resolve, reject) => {
        resolve(dispatch({
            type: 'COIN_LIST_SORT',
            data: { showSortOptions: !(showSortOptions) },
        }))
    })
}


const sorter = (data, filter) => {
    switch (filter) {

        case sort.rank:
            return parseFloat(data.rank)
            break;
        case sort.name:
            return data.name
            break;
        case sort.marketCap:
            return parseFloat(data.market_cap_usd ? data.market_cap_usd : -999)
            break;
        case sort.volume:
            return parseFloat(data["24h_volume_usd"] ? data["24h_volume_usd"] : -999)
            break;
        case sort.change:
            return parseFloat(data.percent_change_1h ? data.percent_change_1h : -999)
            break;
        case sort.topLoser:
            return parseFloat(data.percent_change_24h ? data.percent_change_24h : 999)
            break;
        case sort.topGain:
            return parseFloat(data.percent_change_24h ? data.percent_change_24h : -999)
            break;
        case sort.price:
            return parseFloat(data.price_usd ? data.price_usd : -999)
            break;

        default:
            return parseFloat(data.rank)
            break;
    }

    // if (filter === sortkeys.topGain) {
    //     coinsDetails = coinsDetails.reverse()
    // }
}

export const goToTop = () => {
    return dispatch => new Promise(async (resolve, reject) => {
        return resolve(dispatch({
            type: 'COIN_LIST_SCROLL_TO_TOP',
            data: {
                shouldScrollToTop: true,
            },
        }))
    })
};


export const sortCoins = (coinsDetails, filter) => {
    return dispatch => new Promise(async (resolve, reject) => {
        let coins = coinsDetails.sort(compare = (data1, data2) => {

            if (sorter(data1, filter) < sorter(data2, filter)) {
                return -1;
            }
            if (sorter(data1, filter) > sorter(data2, filter)) {
                return 1;
            }
            return 0;
        })
        if (filter === sort.topGain || filter === sort.marketCap || filter === sort.volume || filter === sort.change || filter === sort.price) {
            coins = coins.reverse()
        }
        return resolve(dispatch({
            type: 'COIN_LIST_RECIVED_COIN_DETAILS_DATA',
            data: {
                coinsDetails: coins,
                sort: filter,
                isRefreshing: false,
                shouldScrollToTop: false
            },
        }))


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

export const getCoins = (start, limit, coinsDetails, loadMore = true, isRefreshing = false, currency = "USD", filter = sort.rank) => {
    // alert(filter)
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
                if (filter !== sort.rank) {
                    data = data.sort(compare = (data1, data2) => {
                        if (sorter(data1, filter) < sorter(data2, filter)) {
                            return -1;
                        }
                        if (sorter(data1, filter) > sorter(data2, filter)) {
                            return 1;
                        }
                        return 0;
                    })
                }

                if (data.length == limit) {
                    return resolve(dispatch({
                        type: 'COIN_LIST_RECIVED_COIN_DETAILS_DATA',
                        data: {
                            coinsDetails: data,
                            loadMore: true,
                            start: start + limit,
                            isRefreshing: false,
                            sort: filter
                        },
                    }))

                } else {
                    resolve(dispatch({
                        type: 'COIN_LIST_RECIVED_COIN_DETAILS_DATA',
                        data: {
                            coinsDetails: coinsDetails.concat(data),
                            loadMore: false,
                            start: start,
                            isRefreshing: false,
                            sort: filter
                        },
                    }))

                }
            })
            return
        }
    })
}
