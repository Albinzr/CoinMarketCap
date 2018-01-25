import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";
import { checkUser, saveUser } from '../actions/profileActions';

class ProfileContainer extends Component {

    static onEnter = () => {
        Actions.refresh({
            enterTime: new Date()
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.enterTime !== nextProps.enterTime) {

        }
    }

    static onExit = (callback) => { }

    componentDidMount = () => this.props.checkUser()


    render = () => {
        const { Layout, username, email, isRegistered, saveUser } = this.props;
        return <Layout username={username} email={email} isRegistered={isRegistered} saveUser={saveUser} />
    }
}

const mapStateToProps = state =>
    ({
        ...state.profileReducers || {},
    });


const mapDispatchToProps = {
    checkUser, saveUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

