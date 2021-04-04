import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Carousel } from 'rsuite';

const SearchByRestaurant = ({restaurants, handleSearch}) => {
    return (
        <>
            <Container style={{backgroundColor: '#8a8c8c', height: '200px'}} className="d-flex mx-auto p-3 justify-content-center align-items-center">
                <Carousel autoplay shape="bar" className="custom-slider">
                    <img
                    src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=1"
                    height="250"
                    alt="pic 1"
                    />
                    <img
                    src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=2"
                    height="250"
                    alt="pic 1"
                    />
                    <img
                    src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=3"
                    height="250"
                    alt="pic 1"
                    />
                    <img
                    src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=4"
                    height="250"
                    alt="pic 1"
                    />
                    <img
                    src="https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=5"
                    height="250"
                    alt="pic 1"
                    />
                </Carousel>
            </Container>
        </>
    );
};

const mapStateToProps = state => {
    return {
        restaurants: state.restaurants
    }
}

export default connect(mapStateToProps)(SearchByRestaurant);