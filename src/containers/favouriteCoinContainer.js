import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";
//
import { getFavCoins, addOrRemoveFavourite, getCoins } from '../actions/favouriteCoinActions'
//
class FavouriteCoinContainer extends Component {

    goToCoinDetailsScreen(coinName, coinSymbol) {
        Actions.CoinDetailScreen({
            coinName: coinName,
            coinSymbol: coinSymbol
        })
    }

    getCoins() {
        this.props.getCoins()
    }

    componentDidMount() {
        this.getCoins()
    }

    static onEnter = () => {
        Actions.refresh({
            enterTime: new Date()
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.enterTime !== nextProps.enterTime) {
            this.getCoins()
        }
    }

    render() {

        const { Layout,
            selectedFavCoins,
            favCoins,
            getFavCoins,
            addOrRemoveFavourite,
            isRefreshing,
            getCoins,
            isLoading
        } = this.props;

        return <Layout
            selectedFavCoins={selectedFavCoins}
            favCoins={favCoins}
            getFavCoins={getFavCoins}
            addOrRemoveFavourite={addOrRemoveFavourite}
            goToCoinDetailsScreen={this.goToCoinDetailsScreen}
            isRefreshing={isRefreshing}
            getCoins={getCoins}
            isLoading={isLoading}
        />

    }
}

const mapStateToProps = state =>
    ({
        ...state.favouritCoinReducer || {},

    });

const mapDispatchToProps = {
    getFavCoins,
    addOrRemoveFavourite,
    getCoins
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteCoinContainer);

