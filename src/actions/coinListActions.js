import apiManager from '../api/apiManager'
import database from '../database/database'
import sort from '../constants/sortConstant'
//
let db = database.new("favourite")

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
        case sort.topGainer:
            return parseFloat(data.percent_change_24h ? data.percent_change_24h : -999)
            break;
        case sort.price:
            return parseFloat(data.price_usd ? data.price_usd : -999)
            break;

        default:
            return parseFloat(data.rank)
            break;
    }

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
        if (filter === sort.topGainer || filter === sort.marketCap || filter === sort.volume || filter === sort.change || filter === sort.price) {
            coins = coins.reverse()
        }
        return resolve(dispatch({
            type: 'COIN_LIST_RECIVED_COIN_DETAILS_DATA',
            data: {
                coinsDetails: coins,
                sort: filter,
                isRefreshing: false,
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
            dispatch({
                type: 'COIN_LIST_OPEN_SEARCH',
                data: { showSearch: true },
            })
        }
        const searchArray = coinNames.filter(function (item) {
            const itemData = item.name.toUpperCase()
            const textData = key.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        debugger
        resolve(dispatch({
            type: 'COIN_LIST_SEARCH_LIST',
            data: { searchArray: searchArray },
        }))
    })
}

export const getCoins = (isRefreshing = false, currency = "USD", filter = sort.rank) => {
    return dispatch => new Promise(async (resolve, reject) => {
        if (isRefreshing) {
            dispatch({
                type: 'COIN_LIST_LOADING',
                data: {
                    isRefreshing: true,
                    isLoading: false
                },
            })
        } else {
            dispatch({
                type: 'COIN_LIST_LOADING',
                data: {
                    isRefreshing: false,
                    isLoading: true
                },
            })
        }

        apiManager.getCoins(0, 10000, currency).then(coinsDetails => {
            if (filter !== sort.rank) {
                coinsDetails = coinsDetails.sort(compare = (data1, data2) => {
                    if (sorter(data1, filter) < sorter(data2, filter)) {
                        return -1;
                    }
                    if (sorter(data1, filter) > sorter(data2, filter)) {
                        return 1;
                    }
                    return 0;
                })

            }
            return coinsDetails

        }).then(coinsDetails => {
            findFavouriteCoins(coinsDetails).then(favouriteCoinTaged => {

                return favouriteCoinTaged

            }).then(favouriteCoinTaged => {
                return resolve(dispatch({
                    type: 'COIN_LIST_RECIVED_COIN_DETAILS_DATA',
                    data: {
                        coinsDetails: favouriteCoinTaged,
                        isRefreshing: false,
                        isLoading: false,
                        sort: filter
                    },
                }))
            })
        })
    })
}

export const updateCoinsDetails = (coinsDetails) => {
    return dispatch => new Promise(async (resolve, reject) => {
        return resolve(dispatch({
            type: 'COIN_LIST_UPDATE_COIN_DETAILS_DATA',
            data: {
                coinsDetails: coinsDetails,
            },
        }))
    })

}
const filterFavouriteCoin = (coinsDetails) => {
    return new Promise((resolve, reject) => {
        let favouriteCoinArray = []
        for (var i = 0; i < Object.keys(coinsDetails).length; i++) {
            if (coinsDetails[i].favourite === true) {
                favouriteCoinArray.push(coinsDetails[i])
            }
            if (i === Object.keys(coinsDetails).length - 1) {
                return resolve(favouriteCoinArray)
            }
        }

    })
}
const findFavouriteCoins = (coinsDetails) => {
    return new Promise(async (resolve, reject) => {
        database.getAllData(db).then(coins => {
            if (coins.total_rows > 0) {
                var favouriteCoinArray = coins.rows.map(favCoin => favCoin.key)
                if (coinsDetails !== undefined) {
                    coinsDetails.forEach((data) => {
                        if (favouriteCoinArray.includes(data.symbol)) {
                            data["favourite"] = true
                        }
                    })
                }
                return resolve(coinsDetails)
            } else {
                return resolve(coinsDetails)
            }
        })
    })
}