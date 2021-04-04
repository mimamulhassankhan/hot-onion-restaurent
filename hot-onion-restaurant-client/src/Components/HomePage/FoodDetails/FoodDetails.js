import { Label, Text } from '@fluentui/react';
import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart, faChevronRight, faChevronLeft, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../../Redux/Actions/RestaurantActions';

const FoodDetails = ({cart, allFoods, addToCart}) => {
    const {itemId} = useParams();
    const history = useHistory();
    const [selectedProduct] = allFoods.filter(pd => pd._id.toString() === itemId.toString());
    console.log(allFoods, itemId);
    const { foodName, foodPrice, foodImage1, foodLongDescription} = selectedProduct;

    //local state
    const [productQuantity, setProductQuantity] = useState(1);
    
    const handleBackToShopButton = event => {
        event.preventDefault();
        history.goBack();
    }

    const handleProductQuantityMinus = () => {
        if(productQuantity > 1){
            setProductQuantity(productQuantity - 1);
        }
    }

    const handleAddProductToCart = () => {
        const productToAdd = selectedProduct;
        productToAdd.quantity = productQuantity;
        addToCart(productToAdd);
    }

    return (
        <>  
            <Container>
                <Row>
                    <Col>
                        <p style={{cursor: 'pointer'}} onClick={handleBackToShopButton} className=""><FontAwesomeIcon icon={faChevronLeft}/> Back to shop</p>
                        <Text variant="xxLarge">{foodName}</Text>
                        <p className="text-muted mt-3">{foodLongDescription}</p>
                        <Row className="align-items-center mt-3">
                            <Col md={3}>
                                <Text variant="xxLarge">$ {foodPrice}</Text>
                            </Col>
                            <Col md={3}>
                                <div className="d-flex align-items-center justify-content-around border rounded-pill">
                                    <FontAwesomeIcon onClick={handleProductQuantityMinus} icon={faMinus}></FontAwesomeIcon>
                                    <Label className="h4">{productQuantity}</Label>
                                    <FontAwesomeIcon onClick={() => setProductQuantity(productQuantity + 1)} icon={faPlus} className="text-danger"></FontAwesomeIcon>
                                </div>
                            </Col>
                        </Row>
                        <Button onClick={handleAddProductToCart} className="rounded-pill mt-3 mb-3" variant="danger"><FontAwesomeIcon icon={faShoppingCart} /> Add</Button>
                        <Row className="align-items-center pt-5">
                            <Col>
                                <img width={150} src="/Images/Breakfast/breakfast2.png" alt="product"/>
                            </Col>
                            <Col>
                                <img width={150} src="/Images/Breakfast/breakfast2.png" alt="product"/>
                            </Col>
                            <Col>
                                <FontAwesomeIcon icon={faChevronRight}/>
                            </Col>
                        </Row>
            
                    </Col>
                    <Col>
                        <div className="text-center mt-2">
                            <img width={400}src={foodImage1}  alt="food" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

const mapStateToProps = state => {
    return {
        cart: state.cart,
        allFoods : state.allFoods
    }
}

const mapDispatchToProps = {
    addToCart : addToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails);