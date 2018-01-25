import apiManager from '../api/apiManager'
import database from '../database/database'
//
let db = database.new("profile")
//
export function checkUser() {
    return dispatch => new Promise(async (resolve, reject) => {

        database.getDataById(db, 'user').then(user => {
            resolve(dispatch({
                type: 'PROFILE_SHOW_USER_REGISTERED',
                data: {
                    isRegistered: true,
                    username: user.username,
                    email: user.email
                },
            }))
        }).catch(error => {
            if (error.status == 404) {
                resolve(dispatch({
                    type: 'PROFILE_SHOW_USER_REGISTERATION',
                    data: {
                        isRegistered: false,
                    },
                }))
            }
        })

    });
}

export function saveUser(username, email) {
    return dispatch => new Promise(async (resolve, reject) => {

        database.insert(db, { _id: "user", username: username, email: email, date: new Date() }).then(savedCoin => {
            resolve(dispatch({
                type: 'PROFILE_SHOW_USER_REGISTERED',
                data: {
                    isRegistered: true,
                },
            }))
        }).catch(coinSaveError => {
            reject(coinSaveError)
        })

    });
}