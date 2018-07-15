import React from 'react';
import { connect } from 'react-redux';
import { nextForm } from '../actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

class Header extends React.Component {
    state = {
        isNavVisible: true,
        isFormOpened: false
    };

    toggleNav = () => {
        this.setState({ isNavVisible: !this.state.isNavVisible})
    };

    openForm = () => {
        if (this.props.step === 0) {
            this.className += " HEADER__BUTTON--ACTIVE";
            this.props.dispatch(nextForm());
        }
    };

    className = "HEADER__BUTTON"

    render() {
        return (
            <div className="HEADER">
                {this.state.isNavVisible && <nav>
                    <button className="HEADER__BUTTON">Главная</button>
                    <button className="HEADER__BUTTON">Информация по программам ДМС</button>
                    <button className="HEADER__BUTTON">Персональная информация</button>
                    <button className={this.className} onClick={this.openForm}>Оформить ДМС</button>
                    <button className="HEADER__BUTTON">Заявки страхования</button>
                </nav>}
                <button 
                    className="HEADER__BURGERBUTTON"
                    onClick={this.toggleNav}>
                    
                    {!this.state.isNavVisible ? 
                        <FontAwesomeIcon 
                            icon={faBars}
                            size="1x"
                            color="white"
                        />
                    :
                        <FontAwesomeIcon 
                            icon={faTimes}
                            size="1x"
                            color="white"
                        />
                    }
                    
                </button>
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