import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../Header/Header';
import HomeMap from '../HomeMap/HomeMap';
import ProductShowCase from '../ProductShowCase/ProductShowCase';

const HomePageIndex = ({restaurants}) => {
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    useEffect(() => {
        let [firstRestaurant] = restaurants;
        setSelectedRestaurant(firstRestaurant?._id)
    },[restaurants])
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