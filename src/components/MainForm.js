import React from 'react';
import StepOneForm from './StepOneForm';
import StepTwoForm from './StepTwoForm';
import StepThreeForm from './StepThreeForm';
import { connect } from 'react-redux';
import StepSelector from './StepSelector';
import { clearForm } from '../actions/actions';

class MainForm extends React.Component {
    cancelForm = () => {
        this.props.dispatch(clearForm());
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

        fetch('http://192.168.1.101:5000/request', { 
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
                    <div>
                        <StepOneForm />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <StepTwoForm />
                    </div>
                );
            case 3:
                return (
                    <div>
                        <StepThreeForm />
                    </div>
                );
            case 4:
                return (
                    <div>
                        <StepOneForm />
                        <StepTwoForm />
                        <StepThreeForm />
                        <StepSelector stepBack={this.cancelForm} stepForward={this.sendData}/>
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