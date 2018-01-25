
import homeRedeucer from './homeReducers'
import coinListReducer from './coinListReducers'
import coinDetailsReducer from './coinDetailReducers'
import favouritCoinReducer from './favouriteCoinReducers'
import profileReducers from './profileReducers'
import { combineReducers } from 'redux';

const rehydrated = (state = false, action) => {
    switch (action.type) {
        case 'persist/REHYDRATE':
            return true;
        default:
            return state;
    }
};

export default {
    rehydrated,
    homeRedeucer,
    coinListReducer,
    coinDetailsReducer,
    favouritCoinReducer,
    profileReducers
};
