import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
//
import { loadAllCoinNames, closeSearch, searchFilter, getCoins } from '../actions/coinListActions';
import { getFavCoins, addOrRemoveFavourite } from '../actions/favouriteCoinActions'
//
const timerIntervel = 60000

class CoinListContainer extends Component {

    constructor(props) {
        super(props)

        this.goToCoinDetailsScreen = this.goToCoinDetailsScreen.bind(this)
    }

    goToCoinDetailsScreen(coinName, coinSymbol) {
        Actions.CoinDetailScreen({
            coinName: coinName,
            coinSymbol: coinSymbol
        })
    }

    componentDidMount() {
        const {
            getCoins,
            coinsDetails,
            start,
            limit,
            loadMore,
            loadAllCoinNames
             } = this.props;
        getCoins(start, limit, coinsDetails, loadMore)
        loadAllCoinNames()
        setTimeout(() => {
            getCoins(start, limit, coinsDetails, loadMore)
        }, timerIntervel);
    }

    render() {

        const { Layout,
            searchFilter,
            coinNames,
            showSearch,
            closeSearch,
            coinsDetails,
            favCoins,
            getFavCoins,
            addOrRemoveFavourite,
            getCoins,
            start,
            limit,
            loadMore,
            isRefreshing,
            searchArray } = this.props;
        return (
            <Layout searchFilter={searchFilter}
                coinNames={coinNames}
                showSearch={showSearch}
                closeSearch={closeSearch}
                coinsDetails={coinsDetails}
                favCoins={favCoins}
                getFavCoins={getFavCoins}
                addOrRemoveFavourite={addOrRemoveFavourite}
                getCoins={getCoins}
                start={start}
                limit={limit}
                loadMore={loadMore}
                isRefreshing={isRefreshing}
                searchArray={searchArray}
                goToCoinDetailsScreen={this.goToCoinDetailsScreen} />
        )

    }
}

const mapStateToProps = state =>
    ({
        ...state.coinListReducer || {},
        ...state.favouritCoinReducer || {}
    });


const mapDispatchToProps = {
    loadAllCoinNames, closeSearch, searchFilter, getCoins, getFavCoins, addOrRemoveFavourite
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinListContainer);

