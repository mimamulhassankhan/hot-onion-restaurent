import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { restaurantStore } from './Redux/Stores/RestaurantStore';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51HadI3J6JIJmmHgl61TslmWB2Tq2VILwkCObBIaO3Y4mvIHWkDa4SvBSEgn9K3FbZsQfms1U89VHmJsnYKvcfQyF00UkikFDVR');

ReactDOM.render(
  <Elements stripe={stripePromise}>
    <Provider store={restaurantStore}>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </Provider>
  </Elements>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
