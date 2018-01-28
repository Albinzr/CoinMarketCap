import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";
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

    componentDidMount() {
        // const { coinsDetails, getFavCoins } = this.props
        // if (Object.keys(coinsDetails).length > 0) {
        //     getFavCoins(coinsDetails)
        // }

    }

    static onEnter = () => {
        Actions.refresh({
            enterTime: new Date()
        })
    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.enterTime !== nextProps.enterTime) {
    //         // this.props.getFavCoins().then(data => {
    //         //     this.props.getSelectedFavCoin(data.data.favCoins)
    //         // })
    //     }
    // }

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
            favouriteCoinArray
                 } = this.props;

        return (
            <Layout
                orginalCoinsDetails={coinsDetails}
                showSearch={showSearch}
                coinsDetails={favouriteCoinArray}
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

