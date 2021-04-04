import React, { useState } from 'react';
import { Badge, Button, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLoggedinUser, updateOwnerLogin } from '../../Redux/Actions/RestaurantActions';
import { handleSignOut } from './signoutManager';
import MiniCart from '../Shared/MiniCart/MiniCart';

const TitleBar = ({cart, user, addLoggedinUser, restaurantOwnerInfo, updateOwnerLogin}) => {
    const [showMiniCart, setShowMiniCart] = useState(false);
    const {name, email} = user;
    const {_id, restaurantName} = restaurantOwnerInfo;

    const signOut = () => {
        handleSignOut()
        .then(res => {
          addLoggedinUser(res);
          updateOwnerLogin({})
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
                        email || _id ?
                        <div className="d-flex align-items-center w-50 justify-content-around">
                            <h5>{name || restaurantName || 'Default'}</h5>
                            <Button onClick={signOut} variant="danger">Sign Out</Button> 
                        </div>   
                        : 
                        <div className="d-flex align-items-center w-50 justify-content-end">
                            <Link to={'/dashboard/myorders'}>
                                <h5>My Account</h5>
                            </Link>
                            <NavDropdown title={`Cart (${cart.length})`} className="font-weight-bold" show={showMiniCart} onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
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
        user: state.user,
        restaurantOwnerInfo: state.restaurantOwnerInfo
    }
}

const mapDispatchToProps = {
    addLoggedinUser : addLoggedinUser,
    updateOwnerLogin: updateOwnerLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleBar);