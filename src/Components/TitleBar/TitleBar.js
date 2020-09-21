import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';

const TitleBar = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                <img
                    alt="logo"
                    src="/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                
                <Button sticky="top" variant="outline-info">Search</Button>
            </Navbar>
        </>
    );
};

export default TitleBar;