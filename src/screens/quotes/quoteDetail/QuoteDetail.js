import React, { useEffect } from 'react';
import { useRouteMatch, Route, Link } from 'react-router-dom';

import styles from './QuoteDetail.module.css';

import Comments from '../comments/Comments';
import {getSingleQuote} from '../../../utils/api';

import useHttp from '../../../hooks/use-http';

function QuoteDetail() {
    // const params = useParams();
    const match = useRouteMatch();
    
    const {sendRequest, status, data, error} = useHttp(getSingleQuote);

    useEffect(() => {
        sendRequest(match.params.quoteId);
    },[sendRequest,match.params.quoteId])

    if(status === 'pending') return <p>Loading...</p>

    if(error) return <p>Error:{error}</p>

    if(status==='completed' && (!data || !data.author) ) return <p>No Detail found!</p>
   
    return (
        <div className={styles.container} >
            <header className={styles.header} >
                Details Screen
            </header>
           
                <figure className={styles.quoteContainer} >
                    <p>{data?.quote}</p>
                    <figcaption>
                        ~{data?.author}
                    </figcaption>
                </figure>
                <Route path={match.url} exact >
                    <Link className={styles.link} to={`${match.url}/comments`}>Load Comments</Link>
                </Route>
                <Route path={`${match.url}/comments`} >
                    <Comments quoteId={match.params.quoteId} />
                </Route>
        </div>
    );
}

export default QuoteDetail;