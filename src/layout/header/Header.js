import React from 'react';
import FoodImg from '../../assets/images/food.jpeg';

import styles from './Header.module.css';
import CartButton from '../cartButton/CartButton';

function Header(props) {
    return (
        <>
        <header className={styles.header} >
            <h1>Chow Meals</h1>
           <CartButton
                onClick={()=>props.onShowCart(true)}
           />  
        </header>
        <div className={styles.imgContainer} >
            <img src={FoodImg} alt='A table of food' />
        </div>
        </>
    );
}

export default Header;