
/**
  * Set an Error Message
  */
export function setError(message) {
    return dispatch => new Promise(resolve => resolve(dispatch({
        type: 'HOME_ERROR',
        data: message,
    })));
}

/**
  * Get random number
  */
export function getRandomNumber() {
    console.log("getting no")
    return dispatch => new Promise(resolve => resolve(dispatch({
        type: 'HOME_RECIVED_DATA',
        data: { numbers: Math.random(5765789).toString() },
    })));
}
