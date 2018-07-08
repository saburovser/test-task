export const submitFirstForm = (firstFormState) => ({
    type: 'SUBMIT_FIRST_FORM',
    ...firstFormState
});

export const submitSecondForm = (secondFormState) => ({
    type: 'SUBMIT_SECOND_FORM',
    ...secondFormState
});

export const submitThirdForm = (thirdFormState) => ({
    type: 'SUBMIT_THIRD_FORM',
    ...thirdFormState
});

export const nextForm = () => ({
    type: 'NEXT_FORM'
});

export const prevForm = () => ({
    type: 'PREV_FORM'
});

export const clearForm = () => ({
    type: 'CLEAR_FORM'
});