import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import colors from '../../../colors/colors'

export default class LoaderComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="gray" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBackgroundColor,
        opacity: 0.8,
        justifyContent: 'center',
        top: 0, bottom: 0, left: 0, right: 0,
        zIndex: 99,
        position: "absolute"
    }
})