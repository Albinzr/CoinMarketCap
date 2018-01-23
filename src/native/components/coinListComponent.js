import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native'
//
import apiManager from '../../api/apiManager'
import colors from '../../../colors/colors'
//
import SearchBar from '../components/searchComponent'
import List from '../components/listComponent'

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
    start,
    limit,
    loadMore,
    goToCoinDetailsScreen,
    isRefreshing,
    searchArray,
    width
  }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#f1f1f3' Translucent={false} barStyle='dark-content' />
            <SearchBar search={(key) => {
                searchFilter(key, coinNames, showSearch)
            }} onPress={closeSearch} />

            <List coins={coinsDetails}
                favCoins={favCoins}
                getFavCoins={getFavCoins}
                addOrRemoveFavourite={addOrRemoveFavourite}
                loadMore={() => {
                    getCoins(start, limit, coinsDetails, loadMore)
                }}
                onSelect={goToCoinDetailsScreen}
                isRefreshing={isRefreshing}
                refresh={() => {
                    getCoins(0, limit, [], true, true)
                }}
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

})

export default CoinListComponent;
