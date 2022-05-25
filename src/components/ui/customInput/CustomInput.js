import React, {forwardRef} from 'react';

import styles from './CustomInput.module.css';

const CustomInput = forwardRef(({id='random',name,error='',isValid=true,containerStyle='none',inputStyle='',...otherProps},ref) => {

    return (
        <div className={containerStyle} >
            <label className={styles.title}  htmlFor={id} >{name}</label>
            <input
                ref={ref}
                className={styles.input+''+inputStyle}
                id={id}
                {...otherProps}
            />
          {!isValid &&  <p className={styles.error} >{error}</p>}
        </div>
    );
})

export default CustomInput;