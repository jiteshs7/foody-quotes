import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import styles from './Quotes.module.css';

import QuoteItem from '../../components/quote/quoteItem/QuoteItem';
import useHttp from '../../hooks/use-http';
import {getAllQuotes} from '../../utils/api';

function Quotes(props) {
    
    const history = useHistory();
    const location = useLocation();

    const {sendRequest, status, data, error} = useHttp(getAllQuotes, true)

    const queryParams = new URLSearchParams(location.search);
    const isSortingAsc = queryParams.get('sort') === 'asc';

    useEffect(() => {
        sendRequest();
    },[sendRequest])

    const sortQuotes = (quotes, ascending) => {
        return quotes.sort((quoteA, quoteB) => {
          if (ascending) {
            return quoteA.id > quoteB.id ? 1 : -1;
          } else {
            return quoteA.id < quoteB.id ? 1 : -1;
          }
        });
      };

    const handleSorting = () => {
        history.push({
            pathname:location.pathname,
            search:`?sort=${isSortingAsc?'desc':'asc'}`
        })
        // history.push(`${location.pathname}?sort=${isSortingAsc?'desc':'asc'}`)
    }

    if(status === 'pending') return <p>Loading...</p>

    if(error) return <p>Error:{error}</p>

    if(status==='completed' && (!data || !data.length) ) return <p>No Quotes Found!</p>

    const sortedQuotes = sortQuotes(data, isSortingAsc);

    const quoteUI = data && data.length>0 ? sortedQuotes.map(item => (
        <QuoteItem
            quote={item}
            key={item.id}
        />
    )):null; 
    
    return (
        <div className={styles.container}>
           <h1>
           Quotes
           </h1> 
           <button onClick={handleSorting} >Sort { isSortingAsc?'Descending' : 'Ascending'}</button>
           <ul className = {styles.listContainer} >
                {quoteUI}
           </ul>
        </div>
    );
}

export default Quotes;