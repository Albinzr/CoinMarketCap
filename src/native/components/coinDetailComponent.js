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
import { AreaChart, YAxis, XAxis, BarChart } from 'react-native-svg-charts'
import { LinearGradient, Stop, Line } from 'react-native-svg'
//
import apiManager from '../../api/apiManager'
import colors from '../../../colors/colors'
import Loader from '../components/loaderComponent'
//
var { height, width } = Dimensions.get('window')
//

const CoinDetailComponent = ({
    isLoading,
    isRefreshing,
    getCoinDetailsAndGraph,
    coinName,
    coinSymbol,
    coinDetails,
    price,
    getCoinGraph,
    selectedButton,
    indicator, indicatorIcon

  }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#f1f1f3' Translucent={false} barStyle='dark-content' />
            {isLoading ? <Loader /> : null}

            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={() => {
                            getCoinDetailsAndGraph(coinName, coinSymbol)
                        }}
                    />
                }
                keyExtractor={(item, index) => item.key}
                bounces={true}
                alwaysBounceVertical={true}
                style={styles.subContainer}
                data={[{ key: 'coinRate' }, { key: 'graph' }, { key: 'coinDetails' }]}
                renderItem={({ item }) => {

                    switch (item.key) {

                        case "coinRate":
                            return (
                                <View>
                                    <View style={styles.headerView}>
                                        <Image style={styles.coinImage} source={{ uri: apiManager.getCoinIcon(coinName) }} />
                                        <View style={styles.coinNameContainer}>
                                            <Text style={styles.coinHeader} > {coinDetails.name}</Text>
                                            <Text style={styles.coinSubHeader} > ({coinDetails.symbol})</Text>
                                        </View>
                                    </View>
                                    <View style={styles.coinRate}>
                                        <View >
                                            <Text style={styles.coinHeader} >${coinDetails.price_usd}</Text>
                                            <Text style={styles.coinSubHeader} > {coinDetails.price_btc} BTC</Text>
                                        </View>

                                        <View style={styles.coinRateFluctuation}>
                                            <Text style={indicator(coinDetails.percent_change_24h)}> {coinDetails.percent_change_24h} </Text>
                                            <Image
                                                style={[styles.indicatorIcon, { width: 14, height: 14 }]}
                                                source={indicatorIcon(coinDetails.percent_change_24h)} />
                                        </View>
                                    </View>
                                </View>)

                        case "graph":

                            var data = []
                            price.forEach((value, index) => {
                                data.push(value[1])
                            })

                            return (
                                <View style={styles.chartContainer}>
                                    <View style={styles.chartButtonContainer} >
                                        <TouchableOpacity onPress={() => getCoinGraph(coinDetails.symbol, '1day')}
                                        >
                                            <Text style={[styles.chartButton, selectedButton("1day")]}>{'1D'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => getCoinGraph(coinDetails.symbol, '7day')}>
                                            <Text style={[styles.chartButton, selectedButton("7day")]}>{'7D'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => getCoinGraph(coinDetails.symbol, '30day')}>
                                            <Text style={[styles.chartButton, selectedButton("30day")]}>{'1M'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => getCoinGraph(coinDetails.symbol, '90day')}>
                                            <Text style={[styles.chartButton, selectedButton("90day")]}>{'3M'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => getCoinGraph(coinDetails.symbol, '180day')}
                                        >
                                            <Text style={[styles.chartButton, selectedButton("180day")]}>{'6M'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => getCoinGraph(coinDetails.symbol, '365day')}
                                        >
                                            <Text style={[styles.chartButton, selectedButton("365day")]}>{'1Y'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => getCoinGraph(coinDetails.symbol)}>
                                            <Text style={[styles.chartButton, selectedButton(undefined)]}>{'All'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View >
                                        <AreaChart
                                            animate={false}
                                            dataPoints={data}
                                            contentInset={{
                                                bottom: 79, right: 32
                                            }}
                                            style={styles.chart}
                                            numberOfTicks={0}
                                            renderGradient={({ id }) => (
                                                <LinearGradient id={id} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                                                    <Stop offset={'10%'} stopColor={'#d0dbe8'} stopOpacity={0.5} />
                                                    <Stop offset={'100%'} stopColor={'#feffff'} stopOpacity={1} />
                                                </LinearGradient>
                                            )} svg={{
                                                stroke: '#d0dae6',
                                            }} />
                                    </View>
                                </ View >
                            )

                        case "coinDetails":
                            var dataSet = [
                                {
                                    name: "Growth",
                                    growth: [
                                        <View key="1">
                                            <Text style={styles.coinLabel}>1 Hour :  <Text style={[styles.coinNumber, indicator(coinDetails.percent_change_1h)]}> {coinDetails.percent_change_1h}</Text>
                                                <Image
                                                    style={styles.indicatorIcon}
                                                    source={indicatorIcon(coinDetails.percent_change_1h)} />
                                            </Text>
                                            <Text style={styles.coinLabel}>24 Hour : <Text style={[styles.coinNumber, indicator(coinDetails.percent_change_24h)]}> {coinDetails.percent_change_24h} </Text>
                                                <Image
                                                    style={styles.indicatorIcon}
                                                    source={indicatorIcon(coinDetails.percent_change_24h)} />
                                            </Text>
                                            <Text style={styles.coinLabel}>7 Days :  <Text style={[styles.coinNumber, indicator(coinDetails.percent_change_7d)]}>{coinDetails.percent_change_7d}</Text>
                                                <Image
                                                    style={styles.indicatorIcon}
                                                    source={indicatorIcon(coinDetails.percent_change_7d)} />
                                            </Text>
                                        </View>
                                    ]
                                },

                                {
                                    name: "Supply",
                                    growth: [
                                        <View key="2">
                                            <Text style={styles.coinLabel}>Available Supply : <Text style={[styles.coinNumber]}> {coinDetails.available_supply} </Text>
                                            </Text>
                                            <Text style={styles.coinLabel}>Total Supply : <Text style={[styles.coinNumber]}> {coinDetails.total_supply} </Text></Text>
                                            <Text style={styles.coinLabel}>Max Supply : <Text style={[styles.coinNumber]}> {coinDetails.max_supply} </Text></Text>
                                        </View>
                                    ]
                                },
                                {
                                    name: "Volume",
                                    growth: [
                                        <View key="3">
                                            <Text style={styles.coinLabel}>Volume(24) : <Text style={[styles.coinNumber]}> ${coinDetails['24h_volume_usd']} </Text></Text>
                                            <Text style={styles.coinLabel}>Market Cap : <Text style={[styles.coinNumber]}> ${coinDetails.market_cap_usd} </Text></Text>
                                        </View>
                                    ]
                                },

                            ]
                            return (
                                <FlatList
                                    keyExtractor={(item) => {
                                        return (item.name)
                                    }}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={dataSet}
                                    renderItem={({ item }) => <View style={styles.coinDetailsContainer} >
                                        <View>
                                            <Text style={styles.title}>{item.name}</Text>
                                        </View>
                                        <View style={styles.coinDetails}>
                                            {item.growth}
                                        </View>
                                    </View>
                                    }
                                />
                            )
                        default:
                            break
                    }
                }}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBackgroundColor,
        paddingTop: 0
    },
    subContainer: {
        flex: 1,
        backgroundColor: colors.primaryBackgroundColor,
        paddingTop: 0,
    },
    headerView: {
        flexDirection: "row",
        padding: 8,
        backgroundColor: colors.primaryColor,
        elevation: 1
    },
    coinImage: {
        width: 64,
        height: 64,
        margin: 8
    },
    coinNameContainer: {
        flexDirection: "row",
        marginTop: 25,
    },
    indicatorIcon: {
        width: 14,
        height: 14,
        ...Platform.select({
            android: {
                marginTop: 0,
                width: 32,
                height: 32,
            }
        }),
    },
    coinRate: {
        flexDirection: "row",
        paddingTop: 20,
        paddingBottom: 20,
        marginLeft: 16,
        marginRight: 16,
    },
    coinDetails: {
        flex: 3,
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
    coinRateFluctuation: {
        flexDirection: "row",
        margin: 8,
    },

    chartContainer: {
        overflow: 'hidden',
        backgroundColor: colors.primaryColor,
        borderRadius: 10,
        height: width - 20,
        width: width - 32,
        marginLeft: 16,
        marginRight: 16,
        elevation: 1

    },
    chartButtonContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    chartButton: {
        color: "#d0dbe8",
        padding: 8,
        borderRadius: 10,
        overflow: "hidden",
    },
    chart: {
        height: width - 100,
        width: width,
    },
    chartInset: {
        bottom: 95, right: 25
    },
    coinDetailsContainer: {
        marginTop: 24,
        backgroundColor: colors.primaryColor,
        padding: 0,
        overflow: 'hidden',
        borderRadius: 10,
        marginBottom: 100,
        marginLeft: 16,
        elevation: 1
    },
    title: {
        color: colors.primaryTextColor,
        padding: 8,
        fontWeight: 'bold'

    },
    coinDetails: {
        padding: 8,
    },
    coinLabel: {
        color: colors.primaryTextColor,
        fontSize: 16,
        marginBottom: 4,
    },
    coinNumber: {
        color: colors.primaryTextColor,
        marginBottom: 4,
        fontWeight: '500'
    },
})


export default CoinDetailComponent;



