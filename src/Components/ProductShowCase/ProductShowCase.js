import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ItemsPivot from '../ItemsPivot/ItemsPivot';

const ProductShowCase = () => {
    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <ItemsPivot></ItemsPivot>
                    <Button variant="secondary">Checkout your food</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductShowCase;