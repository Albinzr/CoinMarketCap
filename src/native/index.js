//Pagkage imports
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Stack } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components'
import theme from '../../native-base-theme/variables/commonColor';
// User defined Import 
import Routes from './routes/navigation';
import Loader from './components/loaderComponent'


const Root = ({ store, persistor }) => (
    <Provider store={store}>
        <PersistGate
            loading={<Loader />}
            persistor={persistor}
        >
            <StyleProvider style={getTheme(theme)}>
                <Router>
                    <Stack key="root">
                        {Routes}
                    </Stack>
                </Router>
            </StyleProvider>
        </PersistGate>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.shape({}).isRequired,
    persistor: PropTypes.shape({}).isRequired,
};

export default Root;
