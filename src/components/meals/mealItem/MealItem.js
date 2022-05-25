import React from 'react';

import styles from './MealItem.module.css';
import MenuItemForm from './mealItemForm/MealItemForm';
import { useCart } from '../../../store/CartProvider';

function MealItem({meal}) {

    const cart = useCart();

    const handleCart = amount => {
        cart.addItem({
            ...meal,
            amount
        })
    }

    const cost = `$${meal.price.toFixed(2)}`;

    return (
        <li className={styles.meal} >
            <div>
                <h3>{meal.name}</h3>
                <div className={styles.desc} >{meal.description}</div>
                <div className={styles.price} >{cost}</div>
            </div>
           <MenuItemForm id={meal.id} onAddAmount={handleCart}  />
        </li>
    );
}

export default MealItem;