import { useReducer, useState } from 'react';

const initialInputState = {
    value: '',
    isTouched: false
}

const inputStateReducer = (state,action) => {
    return initialInputState;
}

function useInput(validateValue) {

    const [inputState,dispatchInput] = useReducer(inputStateReducer,initialInputState);
    
    const [enteredValue,setEnteredValue] = useState('');
    const [isTouched,setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangedHandler = event => setEnteredValue(event.target.value);
    

    const inputBlurHandler = () => setIsTouched(true);

    const reset = () => {
        setEnteredValue('')
        setIsTouched(false)
    }
    

    return {
        value: enteredValue,
        isValid:valueIsValid,
        hasError,
        valueChangedHandler,
        inputBlurHandler,
        reset

    }


}

export default useInput;