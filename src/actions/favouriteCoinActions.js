
import apiManager from '../api/apiManager'
import database from '../database/database'
let db = database.new("favourite")



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

