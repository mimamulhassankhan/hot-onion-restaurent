import React from 'react';
import { useState } from 'react';
import Header from '../../Header/Header';
import ProductShowCase from '../ProductShowCase/ProductShowCase';
import SearchByRestaurant from '../SearchByRestaurant/SearchByRestaurant';

const HomePageIndex = () => {
    const [selectedRestaurant, setSelectedRestaurant] = useState(0);
    return (
        <>
            <Header></Header>
            <SearchByRestaurant handleSearch={setSelectedRestaurant}></SearchByRestaurant>
            <ProductShowCase selectedRestaurant={selectedRestaurant}></ProductShowCase>
        </>
    );
};

export default HomePageIndex;