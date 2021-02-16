import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FoodDetails from './Components/HomePage/FoodDetails/FoodDetails';
import NotFound from './Components/NotFound/NotFound';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';
import CheckOut from './Components/CheckOut/CheckOut';
import OrderPlaced from './Components/OrderPlaced/OrderPlaced';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import TitleBar from './Components/TitleBar/TitleBar';
import AdminPortalIndex from './Components/AdminPortal/AdminPortalIndex/AdminPortalIndex';
import { addRestaurant, setCurrentUserLocation } from './Redux/Actions/RestaurantActions';
import { connect } from 'react-redux';
import HomePageIndex from './Components/HomePage/HomePageIndex/HomePageIndex';
import OwnerAuth from './Components/Shared/OwnerAuth/OwnerAuth';
import OwnerPortalIndex from './Components/RestaurantOwnerPortal/OwnerPortalIndex/OwnerPortalIndex';
import CustomLogin from './Components/Shared/CustomLogin/CustomLogin';

function App({addRestaurant, setCurrentUserLocation}) {
  
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  }

  const success = pos => {
      const crd = pos?.coords;
      const lat = crd?.latitude;
      const lng = crd?.longitude;
      setCurrentUserLocation(lat, lng)
  }

  const errors = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  const locationServices = () => {
      if(navigator.geolocation){
          navigator.permissions.query({name: "geolocation"})
          .then(result => {
              if(result.state === 'granted'){
                  navigator.geolocation.getCurrentPosition(success, errors, options);
              }
              else if(result.state === 'prompt'){
                  navigator.geolocation.getCurrentPosition(success, errors, options);
              }
              else if(result.state === 'denied'){

              }
          })
      }
      else{
          alert('Sorry Not available');
      }
  }

  useEffect(() => {
    locationServices();
  },[])

  useEffect(() => {
    const fetchRestaurantOpertaion = async () => {
      await fetch('https://mighty-meadow-40482.herokuapp.com/getRestaurants')
      .then(res => res.json())
      .then(data =>{
        addRestaurant(data ? data : []);
        });
      }
      fetchRestaurantOpertaion();
  }, [addRestaurant]);

  return (
    <>
      <Router>
          <TitleBar />
          <Switch>
            <Route exact path="/">
                <HomePageIndex />
            </Route>
            <PrivateRoute path="/checkout">
              <CheckOut />
            </PrivateRoute>
            <PrivateRoute path="/adminportal">
              <AdminPortalIndex />
            </PrivateRoute>
            <Route path="/login">
              <Login/>
            </Route>
            <OwnerAuth path="/restaurantowner">
                <OwnerPortalIndex></OwnerPortalIndex>
            </OwnerAuth>
            <Route path="/signup">
              <SignUp/>
            </Route>
            <Route path="/ownerlogin">
              <CustomLogin></CustomLogin>
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

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants
  }
}

const mapDispatchToProps = {
  addRestaurant: addRestaurant,
  setCurrentUserLocation: setCurrentUserLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
