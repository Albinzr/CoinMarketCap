import apiManager from '../api/apiManager'
import sort from '../constants/sortConstant'
//
var filterArray = [sort.topGainer, sort.topLoser,]
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
            type: 'COIN_LIST_RECIVED_SORTED_DETAILS',
            data: {
                sortedCoinsDetails: coins,
                sort: filter,
            },
        }))
    })

}


export const updateSegment = (selectedSegment) => {
    return dispatch => new Promise(async (resolve, reject) => {
        return resolve(dispatch({
            type: 'COIN_LIST_UPDATE_SEGMENT',
            data: {
                selectedSegment: selectedSegment,
            },
        }))
    })
}

export const createAllFilter = (coinsDetails) => {
    return dispatch => new Promise(async (resolve, reject) => {

        filterArray.forEach(filterKey => {

            let coins = coinsDetails.sort(compare = (data1, data2) => {

                let filter = filterKey
                if (sorter(data1, filter) < sorter(data2, filter)) {
                    return -1;
                }
                if (sorter(data1, filter) > sorter(data2, filter)) {
                    return 1;
                }
                return 0;
            })
            if (filterKey === sort.topGainer) {

                return resolve(dispatch({
                    type: 'COIN_LIST_UPDATE_TOP_GAINER',
                    data: {
                        topGainer: coins.reverse().slice(0, 100),
                    },
                }))
            } else if (filterKey === sort.topLoser) {
                return resolve(dispatch({
                    type: 'COIN_LIST_UPDATE_TOP_LOSER',
                    data: {
                        topLoser: coins.slice(0, 100),
                    },
                }))
            }
        })

        //


    })
}