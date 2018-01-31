import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator, FlatList, Image, Text, TouchableOpacity, Platform, RefreshControl } from 'react-native'
//
import colors from '../../../colors/colors'
import apiManager from '../../api/apiManager'
import sort from '../../constants/sortConstant'
//

export default class ListComponent extends Component {

    constructor(props) {
        super(props)
        this.callLoadMore = this.callLoadMore.bind(this)
        this.scrollToTop = this.scrollToTop.bind(this)
        this.flatlistRef = null
    }

    getFavIcon(favourite = false) {
        if (favourite) {
            return require("../../assets/images/bookmark1.png")
        } else {
            return require("../../assets/images/bookmark2.png")
        }
    }
    scrollToTop() {
        this.flatlistref.scrollToOffset({ y: 0, animated: true });
    }
    indicatorIcon(value) {

        if (value !== null && value !== undefined && value.charAt(0) === '-') {
            return require("../../assets/images/up.png")
        } else {
            return require("../../assets/images/down.png")
        }
    }
    indicator(value) {

        if (value !== null && value !== undefined && value.charAt(0) === '-') {
            return { color: colors.fallColor }
        } else {
            return { color: colors.riseColor }
        }
    }

    callLoadMore() {
        this.props.loadMore()
    }

    render() {
        let { isRefreshing,
            refresh, coins,
            onSelect,
            addOrRemoveFavourite,
            updateCoinsDetails,
            shouldScrollToTop,
            orginalCoinsDetails,
            showSegment,
            selectedSegment,
            topGainer,
            topLoser,
        } = this.props;
        let listLoader = null

        if (Object.keys(coins).length > 50) {
            listLoader = <ActivityIndicator style={{ padding: 30 }} size="large" color="gray" />
        }
        // debugger
        showSegment ? selectedSegment === sort.topGainer ? coins = topGainer : coins = topLoser : null
        // debugger
        return (
            <View style={styles.container}>
                {shouldScrollToTop ? this.scrollToTop() : null}
                <FlatList refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={refresh}
                    />
                }
                    ref={(ref) => this.flatlistref = ref}
                    bounces={false}
                    keyExtractor={(item, index) => item.id}
                    data={coins}
                    removeClippedSubviews={false}
                    initialNumToRender={50}
                    maxToRenderPerBatch={50}
                    windowSize={50}
                    onEndThreshold={100}
                    onEndReached={this.callLoadMore}
                    scrollToIndex={0}
                    ListFooterComponent={listLoader}
                    renderItem={({ index, item }) =>
                        <TouchableOpacity onPress={() => {
                            onSelect(item.id, item.symbol)
                        }
                        }>
                            <View style={styles.listCellContainer}>
                                <View style={styles.coinContainer} >
                                    <Image style={styles.coinImage} source={{ uri: apiManager.getCoinIcon(item.id) }} resizeMode="cover" />
                                    <View style={styles.coinNameContainer}>
                                        <Text style={styles.coinHeader}>{item.symbol.toUpperCase()}</Text>
                                        <Text style={styles.coinSubHeader}>{item.name}</Text>
                                    </View>
                                </View>

                                <View style={styles.coinRateContainer}>
                                    <Text style={styles.coinRate}>${Number(Math.round(item.price_usd + 'e' + 8) + 'e-' + 8)}</Text>
                                    <Text style={[styles.coinRateFluctuation, this.indicator(item.percent_change_24h)]}>{item.percent_change_24h}% <Image
                                        style={styles.indicatorIcon}
                                        source={this.indicatorIcon(item.percent_change_24h)} /></Text>
                                    <TouchableOpacity onPress={() => {

                                        let coinArray = Object.assign([], orginalCoinsDetails)

                                        coinArray.forEach(coin => {
                                            if (item.symbol === coin.symbol) {

                                                if (item.favourite === undefined || item.favourite === false) {
                                                    coin["favourite"] = true

                                                } else {
                                                    coin["favourite"] = false
                                                }
                                            }
                                        })

                                        updateCoinsDetails(coinArray).then(none => {
                                            addOrRemoveFavourite(item.symbol).then(none => {
                                                // console.log(none)
                                            })
                                        })


                                    }}>
                                        <Image
                                            style={{ resizeMode: 'contain', alignSelf: 'center', width: 24, height: 24, padding: 0, margin: 0 }}
                                            source={this.getFavIcon(item.favourite)} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBackgroundColor,
        padding: 8,
        paddingTop: 0,
        paddingBottom: 0
    },

    listCellContainer: {
        flex: 1.5,
        flexDirection: "row",
        backgroundColor: colors.primaryColor,
        margin: 8,
        borderRadius: 10,
        elevation: 1
    },
    coinContainer: {
        flex: 2,
        flexDirection: "row",

    },
    coinImage: {
        width: 72,
        height: 72,
        margin: 8
    },
    coinNameContainer: {
        marginTop: 10,

    },
    coinHeader: {
        fontSize: 24,
        color: colors.primaryTextColor
    },
    coinSubHeader: {
        fontSize: 16,
        marginTop: 8,
        color: colors.secondaryTextColor,

    },
    coinRateContainer: {
        flex: 1,
        marginTop: 10,
    },
    coinRate: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primaryTextColor
    },
    coinRateFluctuation: {
        minHeight: 16,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
        color: colors.secondaryTextColor,

    },
    indicatorIcon: {
        width: 14,
        height: 14,
        ...Platform.select({
            android: {
                width: 32,
                height: 32,
            }
        }),
    },
});
