import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";
//
import { getFavCoins, addOrRemoveFavourite, getSelectedFavCoin } from '../actions/favouriteCoinActions'
//
class FavouriteCoinContainer extends Component {
    // getFavCoins = () => {
    //     database.getAllData(db).then(coins => {
    //         if (coins.total_rows > 0) {
    //             var favCoinArray = []
    //             coins.rows.forEach(data => {
    //                 favCoinArray.push(data.id)
    //             })
    //             return favCoinArray
    //         } else {
    //             return []
    //         }
    //     })
    // }

    goToCoinDetailsScreen(coinName, coinSymbol) {
        Actions.CoinDetailScreen({
            coinName: coinName,
            coinSymbol: coinSymbol
        })
    }

    // getCoins() {
    //     this.props.getCoins()
    // }

    componentDidMount() {
        // this.getCoins()
        this.props.getFavCoins().then(data => {
            this.props.getSelectedFavCoin(data.data.favCoins)
        })
    }

    static onEnter = () => {
        Actions.refresh({
            enterTime: new Date()
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.enterTime !== nextProps.enterTime) {
            this.props.getFavCoins().then(data => {
                this.props.getSelectedFavCoin(data.data.favCoins)
            })
        }
    }

    render() {

        const { Layout,
            selectedFavCoins,
            favCoins,
            getFavCoins,
            addOrRemoveFavourite,
            isRefreshing,
            coinsDetails,
            isLoading
        } = this.props;
        return <Layout
            selectedFavCoins={selectedFavCoins}
            favCoins={favCoins}
            getFavCoins={getFavCoins}
            addOrRemoveFavourite={addOrRemoveFavourite}
            goToCoinDetailsScreen={this.goToCoinDetailsScreen}
            isRefreshing={isRefreshing}
            isLoading={isLoading}
        />

    }
}

const mapStateToProps = state =>
    ({
        ...state.coinListReducer || {},
        ...state.favouritCoinReducer || {},

    });

const mapDispatchToProps = {
    getFavCoins,
    addOrRemoveFavourite,
    getSelectedFavCoin
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteCoinContainer);

