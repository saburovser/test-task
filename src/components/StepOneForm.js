import React from 'react';
import InputMask from 'react-input-mask';
import StepSelector from './StepSelector';
import ErrorModal from './ErrorModal';
import { connect } from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import { submitFirstForm, nextForm, prevForm } from '../actions/actions';

class StepOneForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cities: props.cities ? props.cities : [],
            plans: props.plans ? props.plans : [],
            selectedCity: props.selectedCity,
            selectedPlan: props.selectedPlan,
            email: props.email,
            number: props.number,
            price: props.price,
            error: '',
        };
    };
    
    componentDidMount() {
        fetch('http://127.0.0.1:5000/cities')
	        .then(res => res.json())
	        .then(data => this.setState({ cities: data }));
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedCity !== prevState.selectedCity) {
            this.loadPlans();
        } else if (this.state.selectedPlan !== prevState.selectedPlan) {
            this.loadPrice();
        };
    };

    onNumberChange = (e) => {
        this.setState({
          number: e.target.value
        });
    };

    onEmailChange = (e) => {
        this.setState({
          email: e.target.value
        });
    };

    onCityChange = (e) => {
        this.setState({ selectedCity: e.target.value })
    };

    loadPlans = () => {
        fetch(`http://127.0.0.1:5000/plans/${this.state.cities.indexOf(this.state.selectedCity)}`)
	        .then(res => res.json())
	        .then(data => this.setState({ plans: data }));
    };

    loadPrice = () => {
        fetch(`http://127.0.0.1:5000/prices/${this.state.selectedPlan}`)
        .then(res => res.json())
        .then(data => this.setState({ price: data }))
    };

    onPlanChange = (e) => {
        this.setState({
            selectedPlan: e.target.value
        });
    };

    stepForward = () => {       
        if (
            this.state.selectedCity && 
            this.state.selectedPlan &&
            isEmail(this.state.email) &&
            this.state.number.indexOf('_') === -1 &&
            this.state.number.length !== 0
        ) {
            this.props.dispatch(submitFirstForm(this.state));
            this.props.dispatch(nextForm());
        } else {
            this.setState({ error: 'Не все обязательные поля заполнены или не все поля заполнены верно' })
        };        
    };

    onModalClose = () => {
        this.setState({ error: '' });
    };

    render() {
        return (
            <div className="APP">
                {this.props.step !==4 && <h1>Заявка на оформление полиса ДМС</h1>}
                <form className="FORM">                  
                    <div className="FORM__HEADER">
                        Шаг 1
                        <br/>
                        <p>Сотрудник: <p>Имя Сотрудника</p></p> 
                    </div>
                    <select
                        className="FORM__INPUT"
                        value={this.state.selectedCity} 
                        onChange={this.onCityChange}
                        disabled={this.props.step === 4}
                    >
                        <option hidden selected>Город</option>
                        {this.state.cities.map( (city) => (
                            <option 
                                key = {city}
                                value = {city}
                            >
                                {city}
                            </option>
                        ))}
                    </select>
                    <select 
                        className="FORM__INPUT"
                        value={this.state.selectedPlan} 
                        onChange={this.onPlanChange}
                        disabled={this.props.step === 4 || !this.state.selectedCity}
                    >
                        <option hidden selected>План страхования</option>
                        {this.state.plans.map( (plan) => (
                            <option 
                                key = {plan}
                                value = {plan}
                            >
                                {plan}
                            </option>
                        ))}
                    </select>
                    <div className="FORM__SMALLITEM">
                        Стоимость доплаты:
                        <br/> 
                        {this.state.price} рублей
                    </div>
                    <input
                        className="FORM__BIGINPUT"
                        type="text"
                        placeholder="E-mail"
                        value={this.state.email}
                        onChange={this.onEmailChange}
                        disabled={this.props.step === 4}
                    />
                    <InputMask
                        className="FORM__BIGINPUT"
                        mask="8 (999) 999-99-99"
                        value={this.state.number}
                        alwaysShowMask={true}
                        onChange={this.onNumberChange}
                        disabled={this.props.step === 4}
                    />
                    <div className="FORM__UNDERTEXT">
                        Рабочий (с возможностью получения личных писем) или личный
                    </div>
                    <div className="FORM__UNDERTEXT">
                        Для регистрации в личном медицинском кабинете
                    </div>
                </form>
                {this.props.step !== 4 && <StepSelector 
                    className="SELECTOR"
                    stepBack={this.stepBack}
                    stepForward={this.stepForward}
                />}
                <ErrorModal
                    error={this.state.error}
                    onModalClose={this.onModalClose}
                />
            </div>
        );
    };
    
};

const mapStateToProps = (state, props) => {
    return {
        step: state.step,
        ...state.firstFormState
    };
};

export default connect(mapStateToProps)(StepOneForm);