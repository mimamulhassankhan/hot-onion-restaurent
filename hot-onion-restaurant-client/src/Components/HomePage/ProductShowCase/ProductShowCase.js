import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ItemsPivot from '../ItemsPivot/ItemsPivot';

const ProductShowCase = ({cart, products, selectedRestaurant}) => {

    const filteredFoodItems = products.filter(item => item.restaurantId === selectedRestaurant);
    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <ItemsPivot products={filteredFoodItems}></ItemsPivot>
                    {
                        cart.length > 0 ? 
                        <Link to={'/checkout'}>
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
        products: state.products
    }
}

export default connect(mapStateToProps)(ProductShowCase);