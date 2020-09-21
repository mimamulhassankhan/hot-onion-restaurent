import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FoodDetails from './Components/FoodDetails/FoodDetails';
import NotFound from './Components/NotFound/NotFound';

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
            <Route path="/food/item">
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
