import { Text } from '@fluentui/react';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart, faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import TitleBar from '../TitleBar/TitleBar';
import { addToCart } from '../../Redux/Actions/cartActions';

const FoodDetails = ({cart, products, addToCart}) => {
    const {itemId} = useParams();
    const history = useHistory();
    const [selectedProduct] = products.filter(pd => pd.id.toString() === itemId.toString());
    const {name, price, id, photo1Url, photo2Url, photo3Url, longDescription} = selectedProduct;
    
    const handleBackToShopButton = event => {
        history.goBack();
        event.preventDefault();
    }

    return (
        <>  
            <TitleBar></TitleBar>
            
            <Container>
                <Row>
                    <Col>
                        <p style={{cursor: 'pointer'}} onClick={handleBackToShopButton} className=""><FontAwesomeIcon icon={faChevronLeft}/> Back to shop</p>
                        <Text variant="xxLarge">{name}</Text>
                        <p className="text-muted mt-3">{longDescription}</p>
                        <Row className="align-items-center justify-content-around mt-3">
                            <Col>
                                <Text variant="xxLarge">$ {price}</Text>
                            </Col>
                            <Col>
                                <div className="d-flex align-items-center justify-content-around border border-dark rounded-pill">
                                    <p> - </p>
                                    <p> 1 </p>
                                    <p className="text-danger"> + </p>
                                </div>
                            </Col>
                        </Row>
                        <Button onClick={() => addToCart(selectedProduct)} className="rounded-pill mt-3 mb-3" variant="danger"><FontAwesomeIcon icon={faShoppingCart} /> Add</Button>
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