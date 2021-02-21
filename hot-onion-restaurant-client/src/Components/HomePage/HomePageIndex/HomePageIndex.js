import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
import HomeMap from '../HomeMap/HomeMap';
import ProductShowCase from '../ProductShowCase/ProductShowCase';

const HomePageIndex = ({restaurants}) => {
    let [firstRestaurant] = restaurants;
    const [selectedRestaurant, setSelectedRestaurant] = useState(firstRestaurant?._id);
    return (
        <>
            <Header></Header>
            {/* <SearchByRestaurant handleSearch={setSelectedRestaurant}></SearchByRestaurant> */}
            <HomeMap selectedRestaurant={selectedRestaurant} setSelectedRestaurant={setSelectedRestaurant}></HomeMap>
            <ProductShowCase selectedRestaurant={selectedRestaurant}></ProductShowCase>
        </>
    );
};

const mapStateToProps = state => {
    return{
        restaurants: state.restaurants
    }
}

export default connect(mapStateToProps)(HomePageIndex);