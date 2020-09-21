import React from 'react';
import { Button, FormControl, InputGroup, Jumbotron } from 'react-bootstrap';
import './Slider.css'

const Slider = () => {
    return (
        <Jumbotron className="jumbotron-body align-middle">
            <h1>Best food wating for your stomach!</h1>
            <InputGroup className="w-25 pt-3 mx-auto">
                <FormControl className="rounded-pill"
                    placeholder="Search food items"
                    aria-label="Search food items"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                    <Button  className="rounded-pill" variant="danger">Search</Button>
                </InputGroup.Append>
            </InputGroup>              
        </Jumbotron>
    );
};

export default Slider;