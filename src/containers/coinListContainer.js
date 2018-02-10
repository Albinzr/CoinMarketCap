import React, { Component } from 'react'
import { StatusBar, View, TouchableOpacity, Text, Image } from 'react-native'

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

//
import { loadAllCoinNames, closeSearch, searchFilter, getCoins, sortCoins, sortToggle, goToTop, updateCoinsDetails } from '../actions/coinListActions';
import { addOrRemoveFavourite } from '../actions/favouriteCoinActions'
import sort from '../constants/sortConstant'
//
const timerIntervel = 60000
const sortTypes = [sort.rank, sort.price, sort.name, sort.change, sort.volume, sort.marketCap]

class CoinListContainer extends Component {

    constructor(props) {
        super(props)

        this.goToCoinDetailsScreen = this.goToCoinDetailsScreen.bind(this)
        this.sortButton = this.sortButton.bind(this)
    }

    static navigatorStyle = {
        tabBarHidden: true,
    }

    static right = (props) => {
        return (
            <TouchableOpacity onPress={() => props.sortButton()}>
                <Image source={require('../assets/images/sort.png')} style={{ width: 24, height: 24, marginRight: 25, }} />
            </TouchableOpacity >
        );
    }
    sortButton() {
        this.props.sortToggle(this.props.showSortOptions)
    }

    goToCoinDetailsScreen(coinName, coinSymbol) {
        Actions.CoinDetailScreen({
            coinName: coinName,
            coinSymbol: coinSymbol
        })
    }

    componentDidMount() {
        Actions.refresh({ key: 'CoinListScreen', hideTabBar: true });

        this.props.navigation.setParams({
            sortButton: this.sortButton
        })

        loadAllCoinNames()

        const { getCoins, sort } = this.props;

        getCoins(false, "USD", sort).then(() => {
            Actions.refresh({ key: 'CoinListScreen', hideTabBar: false });
        })

        setInterval(() => {
            // alert("updating")
            getCoins(true, "USD", this.props.sort)
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
            addOrRemoveFavourite,
            getCoins,
            isRefreshing,
            showSortOptions,
            searchArray,
            sortToggle,
            sortCoins,
            shouldScrollToTop,
            goToTop,
            isLoading,
            updateCoinsDetails,
            showSearchUI,
         } = this.props;
        return (
            <Layout
                orginalCoinsDetails={coinsDetails}
                searchFilter={searchFilter}
                coinNames={coinNames}
                showSearch={showSearch}
                closeSearch={closeSearch}
                coinsDetails={coinsDetails}
                favCoins={favCoins}
                updateCoinsDetails={updateCoinsDetails}
                addOrRemoveFavourite={addOrRemoveFavourite}
                getCoins={getCoins}
                isRefreshing={isRefreshing}
                searchArray={searchArray}
                goToCoinDetailsScreen={this.goToCoinDetailsScreen}
                showSortOptions={showSortOptions}
                sortTypes={sortTypes}
                sortToggle={sortToggle}
                sortCoins={sortCoins}
                shouldScrollToTop={shouldScrollToTop}
                goToTop={goToTop}
                isLoading={isLoading}
                showSearchUI={showSearchUI}
            />
        )

    }
}

const mapStateToProps = state =>
    ({
        ...state.coinListReducer || {},
    });


const mapDispatchToProps = {
    loadAllCoinNames, closeSearch, searchFilter, getCoins, sortCoins, sortToggle, goToTop, updateCoinsDetails,
    addOrRemoveFavourite
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinListContainer);

