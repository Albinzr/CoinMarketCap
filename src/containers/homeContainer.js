import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";
import { getRandomNumber, setError } from '../actions/homeActions';

class HomeContainer extends Component {

    static defaultProps = {
        match: null,
    }
    constructor(props) {
        super(props)

    }

    static onEnter = () => {
        Actions.refresh({
            enterTime: new Date()
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.enterTime !== nextProps.enterTime) {
            this.props.getRandomNumber()
        }
    }

    static onExit = (callback) => {
        // console.log("viewWillDissapear")
    }


    componentDidMount = () => this.props.getRandomNumber()


    render = () => {
        const { Layout, numbers } = this.props;
        return <Layout numbers={numbers} />
    }
}

const mapStateToProps = state =>
    ({
        ...state.homeRedeucer || {},
    });


const mapDispatchToProps = {
    getRandomNumber,
    setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

