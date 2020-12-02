import { Label, Text } from '@fluentui/react';
import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart, faChevronRight, faChevronLeft, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../../Redux/Actions/RestaurantActions';

const FoodDetails = ({cart, products, addToCart}) => {
    const {itemId} = useParams();
    const history = useHistory();
    const [selectedProduct] = products.filter(pd => pd.id.toString() === itemId.toString());
    const { name, price, photo1Url, photo2Url, photo3Url, longDescription} = selectedProduct;

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
                        <Text variant="xxLarge">{name}</Text>
                        <p className="text-muted mt-3">{longDescription}</p>
                        <Row className="align-items-center mt-3">
                            <Col md={3}>
                                <Text variant="xxLarge">$ {price}</Text>
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
                                <img width={150} src={photo2Url} alt="product"/>
                            </Col>
                            <Col>
                                <img width={150} src={photo3Url} alt="product"/>
                            </Col>
                            <Col>
                                <FontAwesomeIcon icon={faChevronRight}/>
                            </Col>
                        </Row>
            
                    </Col>
                    <Col>
                        <div className="text-center mt-2">
                            <img width={400}src={photo1Url}  alt="food" />
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
        products : state.products
    }
}

const mapDispatchToProps = {
    addToCart : addToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails);