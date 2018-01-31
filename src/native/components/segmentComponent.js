import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,

} from 'react-native'


export default class SegmentComponent extends Component {


    render() {

        const {
            showSegment,
            segmentTitles,
            selectedSegment,
            updateSegment
        } = this.props
        return (<View style={styles.container}>
            <View style={styles.cover}>

                <TouchableOpacity style={styles.equalSpace} onPress={() => {
                    updateSegment(segmentTitles[0])
                }}>
                    <View style={[
                        styles.buttonCover,
                        selectedSegment === segmentTitles[0] ? { backgroundColor: 'white' } : { backgroundColor: "#E7E7E7" }
                    ]}>
                        <Text style={styles.button}>{segmentTitles[0]}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.equalSpace} onPress={() => {
                    updateSegment(segmentTitles[1])
                }}>
                    <View
                        style={[
                            styles.buttonCover,
                            selectedSegment === segmentTitles[1] ? { backgroundColor: 'white' } : { backgroundColor: "#E7E7E7" }
                        ]}>
                        <Text style={styles.button}>{segmentTitles[1]}</Text>
                    </View>

                </TouchableOpacity>

            </View>
        </View >)
    }
}




const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        backgroundColor: '#fff',
        borderBottomWidth: 0.3,
        borderColor: '#E7E7E7'

    },
    cover: {
        alignItems: 'center',
        flexDirection: "row",
        backgroundColor: "#E7E7E7",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: '#E7E7E7'
    },
    equalSpace: {
        flex: 1,
        flexDirection: "row",
    },
    buttonCover: {
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: '#E7E7E7',
        flex: 1,
    },
    button: {
        margin: 10,
        textAlign: "center",
        backgroundColor: 'transparent',
        fontWeight: '600'
    }

})
