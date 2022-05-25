import React from 'react';

import styles from './Checkout.module.css';
import useInputReducer from '../../../hooks/userInputReducer';
import CustomInput from '../../ui/customInput/CustomInput';
import {handleError} from '../../../utils/validation';


function Checkout(props) {

    const {
        value: name,
        error:nameError,
        hasError: nameHasError,
        valueChangedHandler:nameChangeHandler,
        inputBlurHandler: nameInputHandler,
        reset: nameReset
    } = useInputReducer(value => handleError('name',value,3));

    const {
        value: street,
        error:streetError,
        hasError: streetHasError,
        valueChangedHandler:streetChangeHandler,
        inputBlurHandler: streetInputHandler,
        reset: streetReset
    } = useInputReducer(value => handleError('street',value,5));

    const {
        value: postal,
        error:postalError,
        hasError: postalHasError,
        valueChangedHandler:postalChangeHandler,
        inputBlurHandler: postalInputHandler,
        reset: postalReset
    } = useInputReducer(value => handleError('postal code',value,4));

    const {
        value: city,
        error:cityError,
        hasError: cityHasError,
        valueChangedHandler:cityChangeHandler,
        inputBlurHandler: cityInputHandler,
        reset: cityReset
    } = useInputReducer(value => handleError('city',value,4));

    const allBlurred = () => {
        nameInputHandler();
        streetInputHandler();
        postalInputHandler();
        cityInputHandler();
    }

    const confirmHandler = event => {
        event.preventDefault();
        allBlurred();
        const isFormValid = !nameHasError && !streetHasError && !postalHasError && !cityHasError
        if(!isFormValid) return;

        props.onSubmit({
            name,
            street,
            postalCode: postal,
            city
        });
    }

    return (
        <form onSubmit={confirmHandler} >

            <CustomInput
                name='Your Name'
                id='name'
                containerStyle={`${styles.checkout} ${nameHasError? styles.inputError:''}`}
                type='text' 
                value={name}
                onChange={nameChangeHandler} 
                onBlur={nameInputHandler}
                error={nameError}
                isValid={!nameHasError}
            />

            <CustomInput
                name='Street'
                id='street'
                containerStyle={`${styles.checkout} ${streetHasError? styles.inputError:''}`}
                type='text' 
                value={street}
                onChange={streetChangeHandler} 
                onBlur={streetInputHandler}
                error={streetError}
                isValid={!streetHasError}
            />

            <CustomInput
                name='Postal Code'
                id='postal'
                containerStyle={`${styles.checkout} ${postalHasError? styles.inputError:''}`}
                type='text' 
                value={postal}
                onChange={postalChangeHandler} 
                onBlur={postalInputHandler}
                error={postalError}
                isValid={!postalHasError}
            />

            <CustomInput
                name='City'
                id='city'
                containerStyle={`${styles.checkout} ${cityHasError? styles.inputError:''}`}
                type='text' 
                value={city}
                onChange={cityChangeHandler} 
                onBlur={cityInputHandler}
                error={cityError}
                isValid={!cityHasError}
            />

            <div className={styles.btnContainer} >
                <button className={styles.btnCancel} onClick={props.onClose} >Cancel</button>
                <button className={styles.btnConfirm} >Confirm</button>
            </div>

        </form>
    );
}

export default Checkout;