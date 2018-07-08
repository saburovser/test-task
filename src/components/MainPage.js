import React from 'react';
import Header from './Header';
import MainForm from './MainForm';

export default class MainPage extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <MainForm />
            </div>
        )
    }
}