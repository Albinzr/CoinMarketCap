import url from './url'
import api from './api'


class ApiManager {

    getCoins(start = null, limit = null, currency = null) {
        return api.request(url.getCoins(start, limit, currency))
    }

    getCoinDetails(coin = null, currency = null) {
        return api.request(url.getCoinDetails(coin, currency))
    }

    getCoinIcon(coinName) {
        return `https://files.coinmarketcap.com/static/img/coins/128x128/${coinName}.png`
    }

    getCoinGraph(coinName, graphLimit) {

        return api.request(url.getCoinGraph(coinName, graphLimit))
    }

    getAllCoinNames() {
        return api.request(url.getAllCoinNames())
    }


}

let apiManager = new ApiManager()
export default apiManager