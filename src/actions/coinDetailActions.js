import apiManager from '../api/apiManager'

export const getCoinDetails = (coinName, Currency = "USD") => {
    return dispatch => new Promise(async (resolve, reject) => {
        resolve(dispatch({
            type: 'COIN_DETAIL_LOADING',
            data: {
                isLoading: true,
            },
        }))
        apiManager.getCoinDetails(coinName, Currency).then(data => {
            resolve(dispatch({
                type: 'COIN_DETAILS_RECIVED_DATA',
                data: {
                    coinDetails: data[0],
                    isLoading: false
                },
            }))
        })

    })
}


export const getCoinGraph = (coinSymbol, range = "1day") => {
    return dispatch => new Promise(async (resolve, reject) => {
        resolve(dispatch({
            type: 'COIN_DETAIL_LOADING',
            data: {
                isLoading: true,
            },
        }))
        apiManager.getCoinGraph(coinSymbol, range).then(data => {
            resolve(dispatch({
                type: 'COIN_DETAIL_GRAPH_DATA',
                data: {
                    price: data.price,
                    volume: data.volume,
                    marketCap: data.market_cap,
                    graphLimit: "1day",
                    isLoading: false,
                    isRefreshing: false,
                    graphLimit: range
                },
            }))
        })
    })

}