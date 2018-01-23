import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, FlatList, Dimensions, Keyboard } from 'react-native'
import colors from '../../../colors/colors'
var { height, width } = Dimensions.get('window')

export default class searchComponent extends Component {
    constructor(props) {
        super(props)
        this.sendSearchKey = this.sendSearchKey.bind(this)
        this.state = {
            closeButton: false
        }
    }

    sendSearchKey(value) {

        if (!this.state.closeButton) {
            this.setState({ closeButton: true })
        }

        this.props.search(value)
    }

    render() {
        return (
            <View>
                <TextInput
                    onFocus={() => {
                        this.setState({ closeButton: true })
                        this.props.onPress()
                    }}
                    placeholder={"Search"}
                    underlineColorAndroid="transparent"
                    autoCorrect={false}
                    style={styles.searchInputBox}
                    onChangeText={(text) => this.sendSearchKey(text)}


                />
                {this.state.closeButton ? <Text style={styles.closeButton} onPress={() => {
                    Keyboard.dismiss
                    this.setState({ closeButton: false })
                    this.props.onPress()
                }}>X</Text> : null}


            </View >
        )
    }
}

const styles = StyleSheet.create({

    searchInputBox: {
        height: 35,
        margin: 10,
        borderRadius: 10,
        backgroundColor: colors.placeholderBackgroundColor,
        textAlign: 'left',
        paddingLeft: 10,
        color: colors.primaryTextColor,

    },
    closeButton: {
        position: "absolute",
        right: 25,
        top: 18,
        backgroundColor: "transparent",
        color: colors.placeholderTextColor
    }
})