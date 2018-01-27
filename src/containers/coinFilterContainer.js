import React, { Component } from 'react'
import { StatusBar, View, TouchableOpacity, Text, Image } from 'react-native'

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

//
import { sortCoins, } from '../actions/coinFilterActions';
import { getFavCoins, addOrRemoveFavourite } from '../actions/favouriteCoinActions'
import sort from '../constants/sortConstant'
//

class CoinFilterContainer extends Component {

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
        Actions.refresh({ title: '                 Hero/Zero' })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.coinsDetails !== nextProps.coinsDetails) {
            const coinArray = Object.assign([], nextProps.coinsDetails)
            this.props.sortCoins(coinArray, sort.topGain, true)
        }
    }

    render() {

        const { Layout,
            coinsDetails,
            sortedCoinsDetails,
            favCoins,
            getFavCoins,
            addOrRemoveFavourite,
            sortCoins,
            } = this.props;
        return (
            <Layout
                isRefreshing={false}
                selectedFavCoins={sortedCoinsDetails}
                favCoins={favCoins}
                getFavCoins={getFavCoins}
                addOrRemoveFavourite={addOrRemoveFavourite}
                goToCoinDetailsScreen={this.goToCoinDetailsScreen}
                sortCoins={sortCoins}
                getCoins={() => {

                }}
            />
        )

    }
}

const mapStateToProps = state =>
    ({
        ...state.coinListReducer || {},
        ...state.favouritCoinReducer || {},
        ...state.coinFilterReducer || {}
    });


const mapDispatchToProps = {
    sortCoins,
    getFavCoins, addOrRemoveFavourite
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinFilterContainer);

