import React from 'react';
import logo from '../../Data/logo2.png';
import { Button, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'

const TitleBar = () => {
    return (
        <>
            <Navbar sticky="top" className="bg-white container p-4 d-flex justify-content-between align-items-center" variant="light">
                <Navbar.Brand>
                    <img
                        alt="logo"
                        src={logo}
                        width="150"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <div className="d-flex align-items-center w-25 justify-content-around">
                    <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                    <h5>Login</h5>
                    <Button variant="danger">Sign Up</Button>
                </div>
            </Navbar>
        </>
    );
};

export default TitleBar;