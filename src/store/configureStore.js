import { createStore } from 'redux';
import mainReducer from '../reducers/mainReducer';

export default () => {
    const store = createStore(
        mainReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};