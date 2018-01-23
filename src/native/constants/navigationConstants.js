import Colors from '../../../native-base-theme/variables/commonColor';
import color from '../../../colors/colors'
import { Platform } from 'react-native';

export default {
    navbarProps: {
        navigationBarStyle: { backgroundColor: 'white', borderBottomWidth: Platform === 'ios' ? 0 : 1, borderBottomColor: '#e7e7e7', elevation: 0 },
        titleStyle: {
            color: Colors.textColor,
            alignSelf: 'center',
            letterSpacing: 2,
            fontSize: Colors.fontSizeBase,
        },
        backButtonTintColor: Colors.textColor,
    },
    tabProps: {
        swipeEnabled: false,
        tabBarStyle: { backgroundColor: color.tabarBackgroundColor },
        tabBarPosition: 'bottom',
        showLabel: true,
        activeTintColor: 'black'

    },
    icons: {
        style: { color: 'white' },
    },
};
