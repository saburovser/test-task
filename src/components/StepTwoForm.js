import React from 'react';
import StepSelector from './StepSelector';
import { connect } from 'react-redux';
import { submitSecondForm, nextForm, prevForm } from '../actions/actions';

class StepTwoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: props.firstName ? props.firstName : "",
            lastName: props.lastName ? props.lastName : "",
            policyNotNeeded: props.policyNotNeeded ? props.policyNotNeeded : false
        }
    };

    onFirstNameChange = (e) => {
        this.setState({
          firstName: e.target.value.toUpperCase()
        });
    };

    onLastNameChange = (e) => {
        this.setState({
          lastName: e.target.value.toUpperCase()
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
            alert('SUBMIT ALL REQUIRED FIELDS TO CONTINUE!');
        } else {
            this.props.dispatch(submitSecondForm(this.state))
            this.props.dispatch(nextForm());
        }
        
        
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Имя"
                    value={this.state.firstName}
                    onChange={this.onFirstNameChange}
                    disabled={this.props.step === 4 || this.state.policyNotNeeded}
                />
                <input
                    type="text"
                    placeholder="Фамилия"
                    value={this.state.lastName}
                    onChange={this.onLastNameChange}
                    disabled={this.props.step === 4 || this.state.policyNotNeeded}
                />
                {this.props.step !== 4 && <input 
                    type="checkbox" 
                    value="Мне не нужен полис выезжающего за рубеж"
                    checked={this.state.policyNotNeeded}
                    onChange={this.togglePolicyCheckbox}
                />}
                {this.props.step !== 4 && <StepSelector 
                    stepBack={this.stepBack}
                    stepForward={this.stepForward}
                />}
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