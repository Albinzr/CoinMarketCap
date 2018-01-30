import React, { Component } from 'react'
import { StatusBar, View, TouchableOpacity, Text, Image } from 'react-native'

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';


//
import { sortCoins, } from '../actions/coinFilterActions';
import sort from '../constants/sortConstant'
//
import { addOrRemoveFavourite } from '../actions/favouriteCoinActions'
import { updateCoinsDetails } from '../actions/coinListActions';
import { updateSegment, createAllFilter } from '../actions/coinFilterActions'

var segmentTitlesArray = ["Top Gainer", "Top Loser"]

class CoinFilterContainer extends Component {

    static right = (props) => {
        return (
            <TouchableOpacity onPress={() => props.sortButton()}>
                <View style={{ width: 24, height: 24, marginRight: 25, }} />
            </TouchableOpacity >
        );
    }

    goToCoinDetailsScreen(coinName, coinSymbol) {
        Actions.CoinDetailScreen({
            coinName: coinName,
            coinSymbol: coinSymbol
        })
    }

    componentWillMount = () => this.props.createAllFilter(this.props.coinsDetails)
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
            showSegment,
            segmentTitles,
            selectedSegment,
            updateSegment,
            topGainer,
            topLoser,
        } = this.props;


        // const sorter = (data, filter) => {

        //     switch (filter) {
        //         case sort.topLoser:
        //             return parseFloat(data.percent_change_24h ? data.percent_change_24h : 999)
        //             break;
        //         case sort.topGainer:
        //             return parseFloat(data.percent_change_24h ? data.percent_change_24h : -999)
        //             break;
        //     }
        // }

        // let coins = coinsDetails.sort(compare = (data1, data2) => {

        //     let filter = selectedSegment
        //     if (sorter(data1, filter) < sorter(data2, filter)) {
        //         return -1;
        //     }
        //     if (sorter(data1, filter) > sorter(data2, filter)) {
        //         return 1;
        //     }
        //     return 0;
        // })

        // selectedSegment === sort.topGainer ? (coinsDetails.reverse().slice(0, 100)) : (coinsDetails.slice(0, 100))
        // debugger
        return (
            <Layout
                getCoins={this.getCoins}
                orginalCoinsDetails={coinsDetails}
                showSearch={showSearch}
                coinsDetails={coinsDetails}
                favCoins={favCoins}
                updateCoinsDetails={updateCoinsDetails}
                addOrRemoveFavourite={addOrRemoveFavourite}
                isRefreshing={isRefreshing}
                goToCoinDetailsScreen={this.goToCoinDetailsScreen}
                isLoading={isLoading}
                showSearchUI={showSearchUI}
                showSegment={showSegment}
                segmentTitles={segmentTitles}
                selectedSegment={selectedSegment}
                updateSegment={updateSegment}
                topGainer={topGainer}
                topLoser={topLoser}
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
    addOrRemoveFavourite,
    updateCoinsDetails,
    updateSegment,
    createAllFilter
};
export default connect(mapStateToProps, mapDispatchToProps)(CoinFilterContainer);

