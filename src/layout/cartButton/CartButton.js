import React, { useEffect, useState } from 'react';

import CartIcon from '../../assets/icons/CartIcon';
import styles from './CartButton.module.css';
import { useCart } from '../../store/CartProvider';

function CartButton(props) {

    const [isBump,setBump] = useState(false);

    const cart = useCart();

    const numOfItems = cart.items.reduce((crrNum,item)=>{
        return crrNum += item.amount
    },0);

    useEffect(() => {
        if(cart.items.length === 0) return;
        setBump(true);

        const timer = setTimeout(() => {
            setBump(false);
        }, 500);

        return () => clearTimeout(timer);

    },[cart.items])

    const containerStyle = `${styles.btn} ${isBump?styles.bump:''}`

    return (
        <button onClick={props.onClick} className={containerStyle} >
            <span className={styles.icon} >
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={styles.badge} >{numOfItems}</span>
        </button>
    );
}

export default CartButton;