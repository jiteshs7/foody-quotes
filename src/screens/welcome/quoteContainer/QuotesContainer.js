import React from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";

import styles from "./QuotesContainer.module.css";

import Quotes from "../../quotes/Quotes";
import AddQuote from "../../quotes/addQuote/AddQuote";
import QuoteDetail from "../../quotes/quoteDetail/QuoteDetail";

function QuotesContainer(props) {
  return (
    <>
      <header className={styles.container}>
        <div>Great Quotes</div>
        <main>
          <nav className={styles.nav}>
            <ul>
              <li className={styles.link}>
                <NavLink
                  activeClassName={styles.activeLink}
                  to="/quote-container/quotes"
                  exact
                >
                  All Quotes
                </NavLink>
              </li>
              <li className={styles.link}>
                
                <NavLink
                  activeClassName={styles.activeLink}
                  to="/quote-container/newQuote"
                >
                  Add Quote
                </NavLink>
              </li>
            </ul>
          </nav>
        </main>
      </header>
      <Switch>
        <Route path="/quote-container/quotes" exact>
          <Quotes />
        </Route>
        
        <Route path="/quote-container" exact>
          <Redirect to='/quote-container/quotes' />
        </Route>

        <Route path="/quote-container/quotes/:quoteId">
          <QuoteDetail />
        </Route>

        <Route path="/quote-container/newQuote">
          <AddQuote />
        </Route>
      </Switch>
    </>
  );
}

export default QuotesContainer;
