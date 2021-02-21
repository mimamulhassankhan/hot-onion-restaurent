import React, { useState } from 'react';
import { Badge, Button, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLoggedinUser } from '../../Redux/Actions/RestaurantActions';
import { handleSignOut } from './signoutManager';
import MiniCart from '../Shared/MiniCart/MiniCart';

const TitleBar = ({cart, user, addLoggedinUser}) => {
    const [showMiniCart, setShowMiniCart] = useState(false);
    const {name, email} = user;

    const signOut = () => {
        handleSignOut()
        .then(res => {
          addLoggedinUser(res);
        })
      }
    const showDropdown = e => {
        setShowMiniCart(!showMiniCart)
    }
    const hideDropdown = e => {
        setShowMiniCart(false);
    }
    return (
        <>
            <Navbar className="bg-transparent container p-4 d-flex justify-content-between align-items-center" variant="light">
                <Navbar.Brand>
                    <Link to={'/'}>
                        <img
                            alt="logo"
                            src="/Images/logo2.png"
                            width="150"
                            className="d-inline-block align-top"
                        />
                    </Link>
                </Navbar.Brand>    
                    {
                        email ?
                        <div className="d-flex align-items-center w-50 justify-content-around">
                            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                            <Badge pill variant="warning">{cart.length}</Badge>
                            <h5>{name}</h5>
                            <Button onClick={signOut} variant="danger">Sign Out</Button> 
                        </div>   
                        : 
                        <div className="d-flex align-items-center w-50 justify-content-around">
                            <Link to={'/login'}>
                                <h5>Login</h5>
                            </Link>
                            <NavDropdown title={`Cart (${cart.length})`} show={showMiniCart} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                                <MiniCart></MiniCart>
                            </NavDropdown>
                            
                            <Button as={Link} to={'/dashboard/admin'} variant="warning">Admin</Button>
                            <Button as={Link} to={'/restaurantowner'} variant="secondary">Restaurant Admin</Button>
                            <Button as={Link} to={'/signup'} variant="danger">Sign Up</Button> 
                        
                        </div>
                    }
            </Navbar>
        </>
    );
};

const mapStateToProps = state => {
    return {
        cart: state.cart,
        user: state.user
    }
}

const mapDispatchToProps = {
    addLoggedinUser : addLoggedinUser
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleBar);