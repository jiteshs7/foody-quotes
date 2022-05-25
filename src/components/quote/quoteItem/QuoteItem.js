import React from 'react';
import { Link } from 'react-router-dom';

import styles from './QuoteItem.module.css';

function QuoteItem({quote}) {
   
    return (
        <li className={styles.container} >
            <figure>
                <blockquote>
                    <p>{quote?.quote}</p>
                </blockquote>
                <figcaption>{quote?.author}</figcaption>
            </figure>
            <Link to={`/quote-container/quotes/${quote.id}`} className={styles.btn} >View Full Screen</Link>
        </li>
    );
}

export default QuoteItem;