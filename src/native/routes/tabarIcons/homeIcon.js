import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'


export const HomeIcon = (props) => {
    var imageURI = props.focused
        ? require('../../../assets/images/homeSelected.png')
        : require('../../../assets/images/home.png')

    return <Image source={imageURI} style={styles.homeIcon} />

}


export const FavouriteIcon = (props) => {
    var imageURI = props.focused
        ? require('../../../assets/images/bookmarkSelected.png')
        : require('../../../assets/images/bookmark.png')

    return <Image source={imageURI} style={styles.bookmarkIcon} />

}

export const GrowthIcon = (props) => {
    var imageURI = props.focused
        ? require('../../../assets/images/growthSelected.png')
        : require('../../../assets/images/growth.png')

    return <Image source={imageURI} style={styles.growthIcon} />

}


const styles = StyleSheet.create({

    homeIcon: {
        width: 20,
        height: 20
    },
    bookmarkIcon: {
        width: 15,
        height: 15
    },

    growthIcon: {
        width: 20,
        height: 20
    },

})