//
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
//
import { getCoinDetails, getCoinGraph } from '../actions/coinDetailActions';
import colors from '../../colors/colors'

class coinDetailContainer extends Component {
    constructor(props) {
        super(props)
        this.selectedButton = this.selectedButton.bind(this)
        this.getCoinDetailsAndGraph = this.getCoinDetailsAndGraph.bind(this)
    }

    indicator(value) {

        if (value !== null && value !== undefined && value.charAt(0) === '-') {
            return { color: colors.fallColor }
        } else {
            return { color: colors.riseColor }
        }
    }
    selectedButton(graphLimit) {
        debugger
        if (this.props.graphLimit === graphLimit) {
            return { backgroundColor: "#b4c3d5", color: 'white', elevation: 1 }
        }
    }
    indicatorIcon(value) {

        if (value !== null && value !== undefined && value.charAt(0) === '-') {
            return require("../assets/images/up.png")
        } else {
            return require("../assets/images/down.png")
        }
    }

    getCoinDetailsAndGraph(coinName, coinSymbol) {
        this.props.getCoinDetails(coinName)
        this.props.getCoinGraph(coinName)
    }

    componentDidMount() {
        var { coinName, coinSymbol } = this.props.navigation.state.params
        this.getCoinDetailsAndGraph(coinName, coinSymbol)
    }


    render() {
        const { coinName, coinSymbol } = this.props.navigation.state.params
        const { Layout,
            isLoading,
            isRefreshing,
            coinDetails,
            price,
            getCoinGraph,
         } = this.props;

        return <Layout isLoading={isLoading}
            isRefreshing={isRefreshing}
            getCoinDetailsAndGraph={this.getCoinDetailsAndGraph}
            coinName={coinName}
            coinSymbol={coinSymbol}
            coinDetails={coinDetails}
            price={price}
            getCoinGraph={getCoinGraph}
            selectedButton={this.selectedButton}
            indicator={this.indicator}
            indicatorIcon={this.indicatorIcon} />
    }
}


const mapStateToProps = state =>
    ({
        ...state.coinDetailsReducer || {},
    });


const mapDispatchToProps = {
    getCoinDetails,
    getCoinGraph
};

export default connect(mapStateToProps, mapDispatchToProps)(coinDetailContainer);

