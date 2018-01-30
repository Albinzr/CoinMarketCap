import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image, Share } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { HomeIcon, FavouriteIcon, GrowthIcon } from '../native/routes/tabarIcons/homeIcon'
//

import colors from '../../colors/colors'

//

export default class Sidebar extends Component {
    data = [
        { name: "Home", image: <Image source={require('../assets/images/homeSelected.png')} style={[styles.icon, { width: 24, height: 24 }]} /> },
        { name: "Favourite", image: <Image source={require('../assets/images/bookmarkSelected.png')} style={[styles.icon, { width: 17, height: 17, marginLeft: 40 }]} /> },
        { name: "Hero/Zero", image: <Image source={require('../assets/images/growthSelected.png')} style={[styles.icon, { width: 28, height: 28 }]} /> },
        /*"Global Data","Settings",*/
        { name: "", image: null },
        {
            name: "Change logs", image: <Image source={require('../assets/images/log.png')} style={styles.icon} />
        },
        /* "About",*/
        { name: "Share", image: <Image source={require('../assets/images/share.png')} style={[styles.icon, { width: 26, height: 26 }]} /> }]
    render() {
        return (
            <View style={styles.containerCover}>
                <View style={[styles.containerView]}>
                    <FlatList
                        bounces={false}
                        keyExtractor={(item, index) => item.name}
                        style={styles.list}
                        data={this.data}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={styles.listCover} onPress={(screen) => {

                                switch (item.name) {
                                    case 'Home':
                                        // console.log(Actions.currentScene)
                                        Actions.CoinList()
                                        break;
                                    case 'Favourite':
                                        Actions.FavouriteCoin()
                                        break;
                                    case 'Hero/Zero':
                                        Actions.CoinFilter()
                                        break;
                                    case 'Global Data':
                                        // Actions.CoinDetailScreen
                                        break;
                                    case 'Settings':
                                        // Actions.CoinDetailScreen
                                        break;
                                    case 'Change logs':
                                        Actions.logs()
                                        break;
                                    case 'About':
                                        // Actions.CoinDetailScreen
                                        break;
                                    case 'Share':
                                        Share.share({
                                            message: `The best crypto market app ever.
                                            https://play.google.com/store/apps/details?id=com.bitcoin.coinmarketcapapp&hl=en`,
                                            url: 'https://play.google.com/store/apps/details?id=com.bitcoin.coinmarketcapapp&hl=en',
                                            title: 'The best crypto market app ever'
                                        }, {
                                                // Android only:
                                                dialogTitle: 'The best crypto market app ever',

                                            })
                                        break;

                                    default:

                                        break;
                                }

                            }}>
                                {item.image}
                                <Text style={styles.label}>{item.name.toUpperCase()}</Text>
                            </TouchableOpacity>
                        }
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
        marginTop: 64,
        opacity: 1,
    },
    list: {
        backgroundColor: colors.primaryColor,
    },
    label: {
        flex: 1,
        marginTop: 3,
        padding: 10,
        paddingLeft: 20,
        fontSize: 18,
        flexDirection: 'column',
        textAlign: "left",
        backgroundColor: colors.primaryColor,
        minHeight: 50,
        color: colors.primaryTextColor
    },
    listCover: {
        flex: 1,
        flexDirection: 'row',
        borderColor: '#f7f7f7',
        borderBottomWidth: 1
    },
    icon: {
        marginTop: 14,
        marginLeft: 35,
        backgroundColor: colors.primaryColor,
        width: 24,
        height: 24,
    }

})
