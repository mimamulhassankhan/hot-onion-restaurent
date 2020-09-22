import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import TitleBar from '../TitleBar/TitleBar';

const CheckOut = () => {
    return (
        <>
            <TitleBar></TitleBar>
            <Container className="mt-3">
                <Row>
                    <Col>
                        <h3>Edit Delivary Details</h3>
                        <hr/>
                        <Form.Group className="w-75 text-left">
                            <Form.Control size="lg" type="text" placeholder="Area or district" />
                            <br />
                            <Form.Control size="lg" type="text" placeholder="Road no" />
                            <br />
                            <Form.Control size="lg" type="text" placeholder="Flat or suit name" />
                            <br />
                            <Form.Control size="lg" type="text" placeholder="Business name" />
                            <br/>
                            <Form.Control size="lg" placeholder="Special Instruction" as="textarea" rows="2" />
                            <br />
                            <Link to={'/orderconfirmed'}>
                                <Form.Control className="bg-danger text-white" size="lg" type="button" value="Save & Continue" />
                            </Link>
                            <br/>
                        </Form.Group>
                    </Col>
                    <Col className="mt-5" md={4}>
                        <Cart/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CheckOut;