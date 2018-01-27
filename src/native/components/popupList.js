import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Platform,
    Modal,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native'
import colors from '../../../colors/colors'
var { height, width } = Dimensions.get('window')

const PopupList = ({ design,
    sortTypes,
    showSortOptions,
    sortToggle,
    sortCoins,
    coinsDetails,
    goToTop }) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showSortOptions}
            onRequestClose={() => {
                sortToggle(showSortOptions)
            }}>
            <TouchableWithoutFeedback style={styles.modal} onPress={() => sortToggle(showSortOptions)}>
                <View style={styles.containerCover}>
                    <View style={[styles.containerView, design]}>
                        <FlatList
                            bounces={false}
                            keyExtractor={(item, index) => item}
                            style={styles.list}
                            data={sortTypes}
                            renderItem={({ item }) => <TouchableOpacity onPress={() => {
                                sortToggle(showSortOptions)
                                goToTop().then(data => {
                                    sortCoins(coinsDetails, item)
                                })
                            }}>
                                <Text style={styles.label}>{item.toUpperCase()}</Text></TouchableOpacity>}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

    )
}

const styles = StyleSheet.create({
    modal: {


    },
    containerCover: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: height,
        width: width,
        backgroundColor: 'transparent'

    },
    containerView: {
        marginTop: 60,
        width: width,
        opacity: 1,
        height: 150,
    },
    list: {
        backgroundColor: colors.placeholderBackgroundColor
    },
    label: {
        flex: 1,
        marginTop: 1,
        padding: 10,
        fontSize: 18,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: "center",
        alignItems: 'center',
        backgroundColor: colors.primaryColor,
        minHeight: 50,
        color: colors.primaryTextColor
    }

})


export default PopupList


