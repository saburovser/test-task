const mainReducerDefaultState = {
    step: 0,
    
    firstFormState: {
        cities: [],
        plans: [],
        selectedCity: '',
        selectedPlan: '',
        price: 0,
        email: '',
        number: '',
    },
    
    secondFormState : {
        firstName: '',
        lastName: '',
        policyNotNeeded: false
    },

    thirdFormState : {
        file: null,
        fileLoaded: false
    }
};

const mainReducer = (state = mainReducerDefaultState, action) => {
    switch (action.type) {
        case 'SUBMIT_FIRST_FORM':
            return {
                ...state,
                firstFormState: {
                    cities: action.cities,
                    plans: action.plans,
                    selectedCity: action.selectedCity,
                    selectedPlan: action.selectedPlan,
                    price: action.price,
                    email: action.email,
                    number: action.number,
                },
            };
        case 'SUBMIT_SECOND_FORM':
            return {
                ...state,
                secondFormState: {
                    firstName: action.firstName,
                    lastName: action.lastName,
                    policyNotNeeded: action.policyNotNeeded
                },
            };
        case 'SUBMIT_THIRD_FORM':
            return {
                ...state,
                thirdFormState: {
                    file: action.file,
                    fileLoaded: action.fileLoaded,
                },
            };
        case 'NEXT_FORM':
            return {
                ...state,
                step: state.step + 1
            };
        case 'PREV_FORM':
            return {
                ...state,
                step: state.step - 1
            };
        case 'CLEAR_FORM':
            return mainReducerDefaultState;
        default:
            return state;
    }
};

export default mainReducer;