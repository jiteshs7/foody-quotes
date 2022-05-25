import React from 'react';

import QuantBtn from '../../ui/quantBtn/QuantBtn';
import styles from './CartItem.module.css';

function CartItem({item,handleAdd,handleRemove}) {

    return (
        <div className={styles.container} >
            <div >
                <h3>{item.name}</h3>
                <div className={styles.price}>${item.price}</div>
            </div>

            <QuantBtn
                quantity={item.amount}
                onAdd={handleAdd}
                onRemove={handleRemove}
            />

        </div>
    );
}

export default CartItem;