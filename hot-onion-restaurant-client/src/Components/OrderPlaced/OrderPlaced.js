import { Persona, Text } from '@fluentui/react';
import React from 'react';
import { Col, Container, Form, Image, Row } from 'react-bootstrap';

const OrderPlaced = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Image src="/Images/Image/thanos-pal-598887-unsplash.png" alt="delivary" className="rounded"/>
                </Col>
                <Col md={5}>
                    <div className="rounded pl-5 pr-5" style={{backgroundColor: '#d2d0ce'}}>
                        <div className="pl-5" >
                            <img width={100} src="/Images/Image/Group 1151.png" alt="Group 1151" />
                        </div>
                        <div className="mt-2 mb-2 rounded bg-white">
                            <ul>
                                <li>
                                    <h6>Your Location</h6>
                                    <p>107 Road No 8</p>
                                </li>
                                <br/>
                                <li>
                                    <h6>Shop Address</h6>
                                    <p>Gulshan Road Restaurant</p>
                                </li>
                            </ul>
                        </div>
                        <Text variant="xxLarge">09 : 30</Text><br/>
                        <Text variant="medium">Estimated Delivary Time</Text>
                        <div className="mt-2 mb-2 p-2 rounded bg-white">
                            <Persona
                                text="Imamul Hassan"
                                secondaryText="imamul@example.com"
                                tertiaryText="Unverified sender"
                                imageUrl="/Images/Image/Group 1152.png"
                                imageAlt="Kat Larrson, status unknown"
                            />
                        </div>
                        <br/>
                        <Form.Control className="bg-danger text-white" size="lg" type="button" value="Contact" />
                        <br/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderPlaced;