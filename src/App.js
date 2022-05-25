import React,{Suspense} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import CartContainer from "./screens/welcome/CartContainer";
import Welcome from "./screens/welcome/Welcome";
// import QuotesContainer from "./screens/welcome/quoteContainer/QuotesContainer";
import NotFound from './screens/notFound/NotFound';

const CartContainer = React.lazy(()=>import('./screens/welcome/CartContainer'));
const QuotesContainer = React.lazy(()=>import('./screens/welcome/quoteContainer/QuotesContainer'));

function App() {
  return (
    <Suspense fallback={()=><p>Loading...</p>} >
      <Switch>
        <Route path="/" exact>
          <Redirect to="/welcome" />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/cart-container">
          <CartContainer />
        </Route>
        <Route path="/quote-container">
          <QuotesContainer />
        </Route>
        <Route path='*' >
          <NotFound/>
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
