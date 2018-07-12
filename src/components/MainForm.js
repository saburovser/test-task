import React from 'react';
import StepOneForm from './StepOneForm';
import StepTwoForm from './StepTwoForm';
import StepThreeForm from './StepThreeForm';
import { connect } from 'react-redux';
import StepSelector from './StepSelector';
import { prevForm } from '../actions/actions';

class MainForm extends React.Component {
    stepBack = () => {
        this.props.dispatch(prevForm());
    };
    
    sendData = () => {
        const number = this.props.number.replace(/[^0-9]+/g, "").slice(1);
        
        const json = JSON.stringify({
            selectedCity: this.props.selectedCity,
            selectedPlan: this.props.selectedPlan,
            price: this.props.price,
            email: this.props.email,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            number
        });

        fetch('http://127.0.0.1:5000/request', { 
            method: 'POST', 
            body: json,
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.text())
            .then(text => console.log(text))
            .catch(console.log('error!'))
    };

    render() {
        switch (this.props.step) {
            case 1:
                return (
                    <div className="SUMMARY">
                        <StepOneForm />
                    </div>
                );
            case 2:
                return (
                    <div className="SUMMARY">
                        <StepTwoForm />
                    </div>
                );
            case 3:
                return (
                    <div className="SUMMARY">
                        <StepThreeForm />
                    </div>
                );
            case 4:
                return (
                    <div className="SUMMARY">
                        <h1>Заявка на оформление полиса ДМС</h1>
                        <StepOneForm />
                        <StepTwoForm />
                        <StepThreeForm />
                        <StepSelector stepBack={this.stepBack} stepForward={this.sendData}/>
                    </div>
                );
            default:
                return null;
        };
    };
};

const mapStateToProps = (state, props) => {
    return {
        step: state.step,
        ...state.firstFormState,
        ...state.secondFormState
    };
};

export default connect(mapStateToProps)(MainForm);