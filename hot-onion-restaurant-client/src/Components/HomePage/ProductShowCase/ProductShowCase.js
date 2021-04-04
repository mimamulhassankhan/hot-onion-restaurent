import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ItemsPivot from '../ItemsPivot/ItemsPivot';

const ProductShowCase = ({cart, allFoods, selectedRestaurant}) => {
    const filteredFoodItems = allFoods.filter(item => item.restaurantId === selectedRestaurant);
    return (
        <Container>
            <Row>
                <Col >
                    <ItemsPivot foods={filteredFoodItems}></ItemsPivot>
                    {
                        cart.length > 0 ? 
                        <Link to={'/dashboard/customer'}>
                            <Button variant="outline-danger">Checkout your food</Button>
                        </Link> :
                        <Button variant="secondary" disabled>Checkout your food</Button>
                    }
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = state => {
    return {
        cart: state.cart,
        allFoods: state.allFoods
    }
}

export default connect(mapStateToProps)(ProductShowCase);