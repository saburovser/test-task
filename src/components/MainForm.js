import React from 'react';
import StepOneForm from './StepOneForm';
import StepTwoForm from './StepTwoForm';
import StepThreeForm from './StepThreeForm';
import { connect } from 'react-redux';
import StepSelector from './StepSelector';

class MainForm extends React.Component {
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
                        <StepSelector />
                    </div>
                );
        };
    }
};

const mapStateToProps = (state, props) => {
    return {
        step: state.step
    };
};

export default connect(mapStateToProps)(MainForm);