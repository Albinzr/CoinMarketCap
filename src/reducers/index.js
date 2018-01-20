
import homeRedeucer from './homeReducers'
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
    homeRedeucer
};
