import { createStore, combineReducers } from 'redux';

const reducers = combineReducers({
    numeros: function(state, action) {
        switch(action.type) {
            case 'NUM_MAX_ALTERADO':
                return {
                    ...state,
                    max: action.payload
                }
            default:
                return{
                    max: 10
                }
        }
    }
})

function storeConfig() {
    return createStore(reducers);
}

export default storeConfig;