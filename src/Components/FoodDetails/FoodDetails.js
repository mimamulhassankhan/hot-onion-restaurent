import { Text } from '@fluentui/react';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import picture from '../../Data/Image/adult-blur-blurred-background-687824.png'

const FoodDetails = (props) => {
    console.log(props);
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1>This is food text.</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda animi at perspiciatis? Veritatis veniam, maiores quidem corrupti nemo obcaecati hic! Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, ea!</p>
                        <Row className="align-items-center justify-content-around">
                            <Col>
                                <Text variant="xxLarge">$ 120</Text>
                            </Col>
                            <Col>
                                <button className="rounded-pill">Buy</button>
                            </Col>
                        </Row>
                        
                    </Col>
                    <Col>
                        <img src={picture}  alt="food" />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FoodDetails;