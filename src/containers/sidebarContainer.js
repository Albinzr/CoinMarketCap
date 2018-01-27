import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux';
//
import colors from '../../colors/colors'
let data = ["Home", "Favourite", "Hero/Zero", "Global Data", "Settings", "", "Change logs", "About", "Share"]
//

export default class Sidebar extends Component {
    render() {
        return (
            <View style={styles.containerCover}>
                <View style={[styles.containerView]}>
                    <FlatList
                        bounces={false}
                        keyExtractor={(item, index) => item}
                        style={styles.list}
                        data={data}
                        renderItem={({ item }) => <TouchableOpacity onPress={(screen) => {

                            switch (item) {
                                case 'Home':
                                    Actions.CoinListScreen()
                                    break;
                                case 'Favourite':
                                    Actions.FavouriteCoinScreen()
                                    break;
                                case 'Hero/Zero':
                                    Actions.CoinDetailScreen
                                    break;
                                case 'Global Data':
                                    Actions.CoinDetailScreen
                                    break;
                                case 'Settings':
                                    Actions.CoinDetailScreen
                                    break;
                                case 'Change logs':
                                    Actions.CoinDetailScreen
                                    break;
                                case 'About':
                                    Actions.CoinDetailScreen
                                    break;
                                case 'Share':
                                    Actions.CoinDetailScreen
                                    break;

                                default:

                                    break;
                            }

                        }}>
                            <Text style={styles.label}>{item.toUpperCase()}</Text></TouchableOpacity>}
                    />
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({

    containerCover: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: 'transparent'

    },
    containerView: {
        marginTop: 60,
        opacity: 1,
    },
    list: {
        backgroundColor: colors.placeholderBackgroundColor
    },
    label: {
        flex: 1,
        marginTop: 3,
        padding: 10,
        paddingLeft: 35,
        fontSize: 18,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: "left",
        alignItems: 'center',
        backgroundColor: colors.primaryColor,
        minHeight: 50,
        color: colors.primaryTextColor
    }

})
