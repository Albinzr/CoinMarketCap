



class URL {

    // Example: https://api.coinmarketcap.com/v1/ticker/
    // Example: https://api.coinmarketcap.com/v1/ticker/?limit=10
    // Example: https://api.coinmarketcap.com/v1/ticker/?start=100&limit=10
    // Example: https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=10


    getCoins(start = null, limit = null, currency = null) {
        if (start && limit && currency || start == 0 && limit && currency) {
            return `https://api.coinmarketcap.com/v1/ticker/?start=${start}&convert=${currency}&limit=${limit}`
        } else {
            return "https://api.coinmarketcap.com/v1/ticker"
        }

    }


    // Example: https://api.coinmarketcap.com/v1/ticker/bitcoin/
    // Example: https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=EUR


    getCoinDetails(coin = null, currency = null) {
        if (coin && currency) {
            return `https://api.coinmarketcap.com/v1/ticker/${coin}/?convert=${currency}`
        } else {
            return `https://api.coinmarketcap.com/v1/ticker/bitcoin/`
        }
    }


    // Example: "https://files.coinmarketcap.com/static/img/coins/32x32/bitcoin.png"


    getCoinIcon(coinName) {
        if (coinName) {
            return `https://files.coinmarketcap.com/static/img/coins/32x32/${coinName}.png`
        } else {
            return `https://files.coinmarketcap.com/static/img/coins/32x32/bitcoin.png`
        }
    }


    // Example: https://graphs.coinmarketcap.com/currencies/bitcoin/


    getCoinGraph(coinName, graphLimit) {
        if (coinName && graphLimit) {
            return `http://coincap.io/history/${graphLimit}/${coinName}`
        } else {
            return `http://coincap.io/history/${coinName}`
        }
    }

    // Example: https://files.coinmarketcap.com/generated/search/quick_search.json

    getAllCoinNames() {
        return 'https://files.coinmarketcap.com/generated/search/quick_search.json'
    }


}

let url = new URL()

export default url