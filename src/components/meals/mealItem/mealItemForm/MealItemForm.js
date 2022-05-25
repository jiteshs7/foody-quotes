import React, { useState, useRef } from 'react';

import CustomInput from '../../../ui/customInput/CustomInput';
import styles from './MealItemForm.module.css';

function MealItemForm(props) {

    const [isFormValid,setIsFormValid] = useState(true);

    const inputRef = useRef(0);

    const handleSubmit = event => {
        event.preventDefault();
        const enteredAmount = +inputRef.current.value;
        
        if(enteredAmount <= 0 || enteredAmount > 5){
            return setIsFormValid(false)
        }
        setIsFormValid(true)
        props.onAddAmount(enteredAmount);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.container} >
            
            <CustomInput
                ref={inputRef}
                name='Amount'
                id={'amount_'+props.id}
                type='number'
                defaultValue='1'
                min='1'
                max='5'
                step='1'
            />

            <button >
                + Add
            </button>
            {!isFormValid && <p>Please enter valid amount (1-5).</p>}
        </form>
    );
}

export default MealItemForm;