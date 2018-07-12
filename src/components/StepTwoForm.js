import React from 'react';
import StepSelector from './StepSelector';
import ErrorModal from './ErrorModal';
import { connect } from 'react-redux';
import { submitSecondForm, nextForm, prevForm } from '../actions/actions';

class StepTwoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: props.firstName ? props.firstName : "",
            lastName: props.lastName ? props.lastName : "",
            policyNotNeeded: props.policyNotNeeded ? props.policyNotNeeded : false,
            error: '',
        }
    };

    onFirstNameChange = (e) => {
        const firstName = e.target.value.replace(/[^a-z ]/i, "").toUpperCase();
        
        this.setState({
          firstName
        });
    };

    onLastNameChange = (e) => {
        const lastName = e.target.value.replace(/[^a-z ]/i, "").toUpperCase();
        
        this.setState({
          lastName
        });
    };

    togglePolicyCheckbox = (e) => {
        this.setState({
            policyNotNeeded: !this.state.policyNotNeeded
        });
    };

    stepBack = () => {
        this.props.dispatch(submitSecondForm(this.state))
        this.props.dispatch(prevForm());
    }

    stepForward = () => {
        if(!this.state.policyNotNeeded && (!this.state.firstName || !this.state.lastName)) {
            this.setState({ error: 'Заполнены не все обязательные поля' })
        } else {
            this.props.dispatch(submitSecondForm(this.state))
            this.props.dispatch(nextForm());
        }
    }

    onModalClose = () => {
        this.setState({ error: '' });
    };

    render() {
        return (
            <div className="APP">
                <form className="FORM">
                    <div className="FORM__HEADER">
                        Шаг 2: Оформление полиса выезжающего за рубеж
                    </div>
                    { (this.props.step !== 4 || !this.state.policyNotNeeded) && <input
                        className="FORM__BIGINPUT"
                        type="text"
                        placeholder="Имя"
                        value={this.state.firstName}
                        onChange={this.onFirstNameChange}
                        disabled={this.props.step === 4 || this.state.policyNotNeeded}
                    />}
                    { (this.props.step !== 4 || !this.state.policyNotNeeded) && <input
                        className="FORM__BIGINPUT"
                        type="text"
                        placeholder="Фамилия"
                        value={this.state.lastName}
                        onChange={this.onLastNameChange}
                        disabled={this.props.step === 4 || this.state.policyNotNeeded}
                    />}
                    { (this.props.step !== 4 || !this.state.policyNotNeeded) &&
                        <div className="FORM__UNDERTEXT">
                            Латиницей в заграничном паспорте
                        </div>
                    }
                    { (this.props.step !== 4 || !this.state.policyNotNeeded) &&    
                        <div className="FORM__UNDERTEXT">
                            Латиницей в заграничном паспорте
                        </div>
                    }
                    <div className="FORM__HEADER">
                        <input
                            type="checkbox" 
                            value="Мне не нужен полис выезжающего за рубеж"
                            checked={this.state.policyNotNeeded}
                            onChange={this.togglePolicyCheckbox}
                            disabled={this.props.step === 4}
                        />
                        Мне не нужен полис выезжающего за рубеж
                    </div>
                    
                </form>
                {this.props.step !== 4 && <StepSelector 
                    stepBack={this.stepBack}
                    stepForward={this.stepForward}
                />}
                <ErrorModal
                    error={this.state.error}
                    onModalClose={this.onModalClose}
                />
            </div>
        );
    }
} 

const mapStateToProps = (state, props) => {
    return {
        step: state.step,
        ...state.secondFormState
    };
};

export default connect(mapStateToProps)(StepTwoForm);