import React, { Component } from 'react';
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
    StatusBar,
    TextInput
} from 'react-native'
//

import colors from '../../../colors/colors'

class RegisterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            email: null,
        }
    }

    validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
        }
        alert("You have entered an invalid email address!")
        return false
    }

    validateUsename(username) {
        if (username.length > 3) {
            return true
        } else {
            alert("Name should be greater than 2 letter")
            return false
        }
    }



    render() {
        var { username, email } = this.state
        return (<View style={styles.container}>

            <Text style={styles.title}>Lets Get Started</Text>

            <Text style={styles.textInputLabel}>Name</Text>
            <TextInput style={styles.textInput} onChangeText={(text) => this.setState({ username: text })} />

            <Text style={styles.textInputLabel}>Email</Text>
            <TextInput style={styles.textInput} onChangeText={(text) => this.setState({ email: text })} />

            <TouchableOpacity onPress={() => {

                if (this.validateEmail(email) && this.validateUsename(username)) {
                    this.props.saveUser(username, email)
                }

            }}><Text style={styles.continueButton}>CONTINUE</Text></TouchableOpacity>

        </View>)

    }
}



const styles = StyleSheet.create({

    container: {
        margin: 24
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'

    },
    textInput: {
        height: 35,
        borderColor: colors.borderColor,
        borderWidth: 1,
        fontSize: 18,
        backgroundColor: colors.placeholderBackgroundColor,
        paddingLeft: 10,
        borderRadius: 4,
        backgroundColor: colors.primaryColor
    },
    textInputLabel: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 18,

    },
    continueButton: {
        marginTop: 40,
        backgroundColor: "#F23F38",
        height: 35,
        textAlign: "center",
        alignItems: 'center',
        paddingTop: 10,
        color: "#FFFFFF",
        marginLeft: 10,
        marginRight: 10

    }

})

export default RegisterComponent