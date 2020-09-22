import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FoodDetails from './Components/FoodDetails/FoodDetails';
import NotFound from './Components/NotFound/NotFound';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import CheckOut from './Components/CheckOut/CheckOut';
import OrderPlaced from './Components/OrderPlaced/OrderPlaced';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
function App() {
  return (
    <>
      <Router> 
          <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
            <PrivateRoute path="/checkout">
              <CheckOut />
            </PrivateRoute>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/signup">
              <SignUp/>
            </Route>
            <Route path="/orderconfirmed">
              <OrderPlaced/>
            </Route>
            <Route path="/food/item=:itemId">
                <FoodDetails/>
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
          </Switch>
      </Router>
    </>
  );
}

export default App;
