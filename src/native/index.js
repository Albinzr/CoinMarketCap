//Pagkage imports
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Stack } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';
// User defined Import 
import Routes from './routes/navigation';
import Loader from './components/loaderComponent'


const Root = ({ store, persistor }) => (
    <Provider store={store}>
        <PersistGate
            loading={<Loader />}
            persistor={persistor}
        >
            <Router>
                <Stack key="root">
                    {Routes}
                </Stack>
            </Router>

        </PersistGate>
    </Provider>
);

//changed
export default Root;
