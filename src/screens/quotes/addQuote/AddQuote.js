import React, { useEffect, useState } from 'react';
import { useHistory, Prompt } from 'react-router-dom';

import styles from './AddQuote.module.css';

import CustomInput from '../../../components/ui/customInput/CustomInput';
import useInputReducer from '../../../hooks/userInputReducer';
import {handleError} from '../../../utils/validation';
import useHttp from '../../../hooks/use-http';
import {addQuote} from '../../../utils/api';

function AddQuote(props) {

    const {
        value: name,
        error:nameError,
        hasError: nameHasError,
        valueChangedHandler:nameChangeHandler,
        inputBlurHandler: nameInputHandler,
        reset: nameReset
    } = useInputReducer(value => handleError('author',value,3));

    const {
        value: quote,
        error:quoteError,
        hasError: quoteHasError,
        valueChangedHandler:quoteChangeHandler,
        inputBlurHandler: quoteInputHandler,
        reset: quoteReset
    } = useInputReducer(value => handleError('quote',value,5));

    const {sendRequest,status} = useHttp(addQuote);

    const history = useHistory();

    const [isEntered, setEntering] = useState(false);

    useEffect(() => {
        if(status === 'completed')
        history.push('/quote-container/quotes')
        nameReset();
        quoteReset();
    },[status, history])

    const handleSubmit = event => {
        event.preventDefault();

        nameInputHandler();
        quoteInputHandler();
        
        const isFormValid = !nameHasError && !quoteHasError
        
        if(!isFormValid) return;
        sendRequest({
            author:name,
            quote,
        })
    }

    const handleFocus = () => {
        setEntering(true);
    }

    const handleFinishEntering = () => {
        setEntering(false);
    }

    return (
        <div className={styles.container} >
                <Prompt when={isEntered} message={(location)=>{
                    'Are you sure you want to leave? All your entered data will be lost!'
                }} />
               <form onFocus={handleFocus} onSubmit={handleSubmit}  className={styles.form}>
                   <CustomInput
                        id='author'
                        name='Author'
                        containerStyle={styles.inputContainer}
                        type='text'
                        value={name}
                        onChange={nameChangeHandler} 
                        onBlur={nameInputHandler}
                        error={nameError}
                        isValid={!nameHasError}
                   />
    
                   <CustomInput
                        id='author'
                        name='Quote'
                        containerStyle={`${styles.inputContainer} ${styles.textArea}`}
                        type='textarea'
                        value={quote}
                        onChange={quoteChangeHandler} 
                        onBlur={quoteInputHandler}
                        error={quoteError}
                        isValid={!quoteHasError}
                   />
                   <button onClick={handleFinishEntering} >Add Quote</button>
               </form>
           
        </div>
    );
}

export default AddQuote;