import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native'
//
import apiManager from '../../api/apiManager'
import colors from '../../../colors/colors'
//
import SearchBar from '../components/searchComponent'
import List from '../components/listComponent'
import SortMenu from './popupList'
import Loader from './loaderComponent'
import SegmentConroll from './segmentComponent'
// import sort from '../../constants/sortConstant'
//
var { height, width } = Dimensions.get('window')

const CoinListComponent = ({
    searchFilter,
    coinNames,
    showSearch,
    closeSearch,
    coinsDetails,
    favCoins,
    getFavCoins,
    addOrRemoveFavourite,
    getCoins,
    goToCoinDetailsScreen,
    isRefreshing,
    searchArray,
    showSortOptions,
    sortTypes,
    sortToggle,
    sortCoins,
    shouldScrollToTop,
    goToTop,
    isLoading,
    updateCoinsDetails,
    showSearchUI,
    orginalCoinsDetails,
    showSegment,
    segmentTitles,
    selectedSegment,
    updateSegment,
    topGainer,
    topLoser,
}) => {

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#f1f1f3' Translucent={false} barStyle='dark-content' />

            {
                isLoading ? <Loader /> : null
            }

            {
                showSortOptions ? <SortMenu
                    showSortOptions={showSortOptions}
                    sortTypes={sortTypes}
                    design={styles.sortMenu}
                    sortToggle={sortToggle}
                    sortCoins={sortCoins}
                    coinsDetails={coinsDetails} goToTop={goToTop} /> : null
            }

            {
                showSearchUI ? <SearchBar
                    search={(key) => {
                        searchFilter(key, coinNames, showSearch)
                    }} onPress={closeSearch} /> : null
            }
            {
                showSegment ? <SegmentConroll
                    showSegment={showSegment}
                    segmentTitles={segmentTitles}
                    selectedSegment={selectedSegment}
                    updateSegment={updateSegment} /> : null
            }


            < List
                topGainer={topGainer}
                topLoser={topLoser}
                coins={coinsDetails}
                orginalCoinsDetails={orginalCoinsDetails}
                updateCoinsDetails={updateCoinsDetails}
                favCoins={favCoins}
                getFavCoins={getFavCoins}
                addOrRemoveFavourite={addOrRemoveFavourite}
                showSegment={showSegment}
                selectedSegment={selectedSegment}
                loadMore={() => {
                    // getCoins()
                }}
                onSelect={goToCoinDetailsScreen}
                isRefreshing={isRefreshing}
                refresh={() => {
                    getCoins(true)
                }}
                shouldScrollToTop={shouldScrollToTop}
                filter={showSegment ? segmentTitles[0] : "rank"}
            />

            {showSearch ? <FlatList
                ItemSeparatorComponent={() => <View style={{ width: width, height: 1, backgroundColor: colors.secondaryTextColor }} />}
                style={{ position: "absolute", top: 54, right: 0, left: 0, bottom: 0, backgroundColor: colors.primaryBackgroundColor }}
                keyExtractor={item => item.rank}

                data={searchArray}
                renderItem={({ item }) =>

                    <TouchableOpacity style={{
                        flex: 1, flexDirection: "row"
                    }} onPress={() => {
                        goToCoinDetailsScreen(item.slug, item.symbol)
                    }}>
                        < Image style={styles.coinImage} source={{ uri: apiManager.getCoinIcon(item.slug) }} resizeMode="cover" />
                        <Text style={{ paddingTop: 13 }}>{item.name}</Text>
                    </TouchableOpacity>
                }
            /> : null
            }

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    coinImage: {
        width: 24,
        height: 24,
        margin: 8
    },
    HeaderText: {
        marginLeft: 15,
        marginTop: 8,
        fontSize: 24,
        fontWeight: "bold",
        color: colors.primaryTextColor
    },
    sortMenu: {
        height: 308
    }

})

export default CoinListComponent;

