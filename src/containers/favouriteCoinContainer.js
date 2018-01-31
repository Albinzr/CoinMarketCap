import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";
import { View, TouchableOpacity } from 'react-native'
//
import { addOrRemoveFavourite } from '../actions/favouriteCoinActions'
import { updateCoinsDetails } from '../actions/coinListActions';
//
class FavouriteCoinContainer extends Component {

    goToCoinDetailsScreen(coinName, coinSymbol) {
        Actions.CoinDetailScreen({
            coinName: coinName,
            coinSymbol: coinSymbol
        })
    }

    static right = (props) => {
        return (
            <TouchableOpacity onPress={() => props.sortButton()}>
                <View style={{ width: 24, height: 24, marginRight: 25, }} />
            </TouchableOpacity >
        );
    }
    static onEnter = () => {
        Actions.refresh({
            enterTime: new Date()
        })
    }
    getCoins() {

    }
    render() {

        const { Layout,
            showSearch,
            coinsDetails,
            favCoins,
            addOrRemoveFavourite,
            isRefreshing,
            isLoading,
            updateCoinsDetails,
            showSearchUI,
        } = this.props;

        return (
            <Layout
                getCoins={this.getCoins}
                orginalCoinsDetails={coinsDetails}
                showSearch={showSearch}
                coinsDetails={coinsDetails.filter(coin => coin.favourite)}
                favCoins={favCoins}
                updateCoinsDetails={updateCoinsDetails}
                addOrRemoveFavourite={addOrRemoveFavourite}
                isRefreshing={isRefreshing}
                goToCoinDetailsScreen={this.goToCoinDetailsScreen}
                isLoading={isLoading}
                showSearchUI={showSearchUI}
            />
        )
    }
}

const mapStateToProps = state =>
    ({
        ...state.coinListReducer || {},
        ...state.favouritCoinReducer || {},

    });

const mapDispatchToProps = {
    addOrRemoveFavourite, updateCoinsDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteCoinContainer);

