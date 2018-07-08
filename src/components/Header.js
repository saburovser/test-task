import React from 'react';
import { connect } from 'react-redux';
import { nextForm } from '../actions/actions';

class Header extends React.Component {
    state = {
        isNavVisible: true
    };

    toggleNav = () => {
        this.setState({ isNavVisible: !this.state.isNavVisible})
    };

    openForm = () => {
        if (this.props.step === 0) {
            this.props.dispatch(nextForm())
        }
    };

    render() {
        return (
            <div>
                {this.state.isNavVisible && <nav>
                    <button>Главная</button>
                    <button>Информация по программам ДМС</button>
                    <button>Персональная информация</button>
                    <button onClick={this.openForm}>Оформить ДМС</button>
                    <button>Заявки страхования</button>
                </nav>}
                <button onClick={this.toggleNav}>BURGER</button>
            </div>
        )
    }
};

const mapStateToProps = (state, props) => {
    return {
        step: state.step
    };
};

export default connect(mapStateToProps)(Header);