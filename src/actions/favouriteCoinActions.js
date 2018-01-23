
import apiManager from '../api/apiManager'
import database from '../database/database'
let db = database.new("favourite")

export const getFavCoins = () => {
    return dispatch => new Promise(async (resolve, reject) => {
        resolve(dispatch({
            type: 'FAVOURITE_COIN_LOADING',
            data: {
                isLoading: true,
            },
        }))
        database.getAllData(db).then(coins => {
            if (coins.total_rows > 0) {
                var favCoinArray = []
                coins.rows.forEach(data => {
                    favCoinArray.push(data.id)
                })
                resolve(dispatch({
                    type: 'FAVOURITE_COIN_RECIVED_DATA',
                    data: {
                        favCoins: favCoinArray,
                        isLoading: false,
                    },
                }))
            } else {
                resolve(dispatch({
                    type: 'FAVOURITE_COIN_RECIVED_DATA',
                    data: {
                        favCoins: [],
                        isLoading: false,
                    },
                }))
            }
        })
    })
}


export const addOrRemoveFavourite = (coinSymbol) => {
    return dispatch => new Promise((resolve, reject) => {
        database.getDataById(db, coinSymbol)
            .then(coin => {
                database.delete(db, coinSymbol).then(deletecCoin => {
                    resolve(deletecCoin)
                }).catch(deleteError => {
                    reject(deleteError)
                })
            })
            .catch(coinError => {
                database.insert(db, { _id: coinSymbol, date: new Date() }).then(savedCoin => {
                    resolve(savedCoin)
                }).catch(coinSaveError => {
                    reject(coinSaveError)
                })
            })
    })
}


export const getCoins = (isRefreshing = false, currency = "USD") => {
    return dispatch => new Promise(async (resolve, reject) => {
        resolve(dispatch({
            type: 'FAVOURITE_COIN_LOADING',
            data: {
                isLoading: true,
            },
        }))
        database.getAllData(db).then(coins => {
            if (coins.total_rows > 0) {
                var favCoinArray = []
                coins.rows.forEach(data => {
                    favCoinArray.push(data.id)
                })
                return favCoinArray
            } else {
                return []
            }

        }).then(coinList => {
            if (coinList.length > 0) {
                apiManager.getCoins(0, 10000, "USD").then(coinDetails => {
                    var favCoinDetailsArray = []
                    coinDetails.forEach(coin => {
                        if (coinList.includes(coin.symbol)) {
                            favCoinDetailsArray.push(coin)
                        }
                    })
                    return favCoinDetailsArray
                }).then(coinArray => {
                    resolve(dispatch({
                        type: 'SELECTED_FAVOURITE_COIN_DETAIL_DATA',
                        data: {
                            selectedFavCoins: coinArray,
                            isLoading: false
                        },
                    }))
                })
            } else {
                // Show no fav screen
                resolve(dispatch({
                    type: 'FAVOURITE_COIN_LOADING',
                    data: {
                        isLoading: false,
                    },
                }))
            }
        })
            .catch(favCoinError => {
                // console.log(favCoinError, "cannot get fav coin")
                resolve(dispatch({
                    type: 'FAVOURITE_COIN_LOADING',
                    data: {
                        isLoading: false,
                    },
                }))
            })
    })


}