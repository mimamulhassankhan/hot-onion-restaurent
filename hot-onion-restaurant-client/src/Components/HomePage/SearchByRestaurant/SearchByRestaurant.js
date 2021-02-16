import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

const SearchByRestaurant = ({restaurants, handleSearch}) => {
    return (
        <>
            <Container style={{backgroundColor: '#8a8c8c', height: '200px'}} className="d-flex mx-auto p-3 justify-content-center align-items-center">
                <Form.Group>
                    <Form.Label>Search by Restaurants</Form.Label>
                    <Form.Control as="select" defaultValue={0} onChange={(e) => handleSearch(e.target.value)}>
                        {
                            restaurants.map(restaurant => <option value={restaurant._id} key={restaurant._id}>{restaurant.restaurantName}</option>)
                        }
                    </Form.Control>
                </Form.Group>
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