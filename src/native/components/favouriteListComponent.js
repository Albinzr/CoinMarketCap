import React, { Component } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import colors from '../../../colors/colors'
import List from '../components/listComponent'
import Loader from '../components/loaderComponent'

const FavouriteListComponent = ({
    selectedFavCoins,
    favCoins,
    getFavCoins,
    addOrRemoveFavourite,
    goToCoinDetailsScreen,
    isRefreshing,
    // getCoins,
    isLoading
  }) => {
    return (
        <View style={styles.container}>
            {isLoading ? <Loader /> : null}
            <StatusBar backgroundColor='#f1f1f3' Translucent={false} barStyle='dark-content' />
            <List coins={selectedFavCoins}
                favCoins={favCoins}
                getFavCoins={getFavCoins}
                addOrRemoveFavourite={addOrRemoveFavourite}
                loadMore={() => {

                }}
                onSelect={goToCoinDetailsScreen}
                isRefreshing={isRefreshing}
                refresh={() => {
                    // getCoins(true)
                }}
            />
        </View >
    );
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


export default FavouriteListComponent;



