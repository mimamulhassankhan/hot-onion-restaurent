import React from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';

const HomeMap = ({currentUserLocation, restaurants, selectedRestaurant, setSelectedRestaurant}) => {
    const pushPinAdd = (id) => {
      setSelectedRestaurant(id);
    }
    let center = [currentUserLocation.lat, currentUserLocation.lng];
    const optimizedRestaurants = restaurants.map(restaurant => {
      
      restaurant.location = [restaurant.restaurantMapLatitude, restaurant.restaurantMapLongitude];
      restaurant.addHandler =  'mouseover';
      restaurant.infoboxOption = {'title': restaurant?.restaurantName, description: `${restaurant.restaurantCategory} Restaurant`}
      restaurant.pushPinOption = {'title': restaurant?.restaurantName};
      restaurant.pushPinAddHandler = {type: 'click', callback: () => pushPinAdd(restaurant._id)}
      return restaurant;
    });

    return (
      <>
        <Container>
          <div className="my-3" style={{height: '400px'}}>
            <ReactBingmaps
              bingmapKey="AqYIoY4P882HDAul0j2WfAhfzCeBsePaBB2D85v7o6W75O7FWKYQAtIMwmfQAB6B"
              center = {center}
              zoom={12}
              infoboxesWithPushPins = {optimizedRestaurants}
              >
              </ReactBingmaps> 
          </div>
          <>
            <h3>Selected Restaurant: {selectedRestaurant}</h3>
            <hr style={{border: '3px solid ##007ACC'}}/>
          </>
        </Container>
      </>
    );
};

const mapStateToProps = state => {
  return{
    currentUserLocation: state.currentUserLocation,
    restaurants: state.restaurants
  }
}

export default connect(mapStateToProps)(HomeMap);