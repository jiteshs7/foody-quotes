import React from 'react';

import styles from './QuantBtn.module.css';

function QuantBtn({quantity,onAdd,onRemove}) {
    return (
        <div className={styles.container} >
            <button onClick={onAdd} >+</button>
            <div className={styles.quantity} >{quantity}</div>
            <button onClick={onRemove} >-</button>
            
        </div>
    );
}

export default QuantBtn;