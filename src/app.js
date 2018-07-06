import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import MainForm from './components/MainForm';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <MainForm />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));