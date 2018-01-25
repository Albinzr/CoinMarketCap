import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    Image,
    TouchableOpacity,
    Platform,
    RefreshControl,
    StatusBar
} from 'react-native'


const FloatingButtonComponent = ({ design }) => {
    return (<View style={[styles.button, design]}><Text style={styles.text}>+</Text></View>)
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        backgroundColor: "#7bed9f"
    },
    text: {
        fontSize: 28,
        color: 'white',
        position: 'absolute',
        top: 60 / 2 - 18,
        left: 60 / 2 - 9
    }

})

export default FloatingButtonComponent