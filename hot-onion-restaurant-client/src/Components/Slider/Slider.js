import React from 'react';
import { Button, FormControl, InputGroup, Jumbotron } from 'react-bootstrap';
import './Slider.css'

const Slider = () => {
    return (
        <Jumbotron className="jumbotron-body align-middle">
            <h1>Best food wating for your stomach!</h1>
            <InputGroup className="mx-auto w-50 pt-3">
                <FormControl
                    placeholder="Search anything..."
                    aria-label="Recipient's username"
                />
                <InputGroup.Append>
                    <Button variant="danger">Button</Button>
                </InputGroup.Append>
            </InputGroup>              
        </Jumbotron>
    );
};

export default Slider;