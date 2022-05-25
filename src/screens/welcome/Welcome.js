import React from 'react';
import {Link} from 'react-router-dom';

import styles from './Welcome.module.css';
import Quaotes from '../../assets/images/quotes.jpeg';
import Food from '../../assets/images/food.jpeg';
function Welcome(props) {
    return (
        <div className={styles.container} >
            <header>Welcome</header>
            <main className={styles.main} >
            <ul className={styles.list} >
                <li className={styles.imgContainer} >
                    <Link className={styles.imgLink} to='/quote-container' >
                        <img className={styles.image} src={Quaotes} />
                        <h2>Quotes</h2>
                    </Link>
                </li>

                <li className={styles.imgContainer} >
                    <Link className={styles.imgLink} to='/cart-container' >
                        <img className={styles.image} src={Food} />
                        <h2>Cart</h2>
                    </Link>
                </li>
            </ul>
            </main>
        </div>
    );
}

export default Welcome;