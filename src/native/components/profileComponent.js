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

import Register from './registerComponent'
import FloatingButton from './floatingButtonComponent'
import colors from '../../../colors/colors'


const ProfileComponent = ({ username, email, isRegistered, saveUser }) => {

    return (<View style={{ backgroundColor: colors.primaryBackgroundColor, flex: 1, }}>
        <StatusBar backgroundColor='#f1f1f3' Translucent={false} barStyle='dark-content' />
        {isRegistered ? <FloatingButton design={styles.floatingButton} /> : <Register saveUser={saveUser} />}

    </View>)
}

const styles = StyleSheet.create({

    floatingButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: 20,
        marginBottom: 20,
    }

})
export default ProfileComponent