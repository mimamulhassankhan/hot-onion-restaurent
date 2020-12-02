import { Text } from '@fluentui/react';
import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addToCart } from '../../Redux/Actions/RestaurantActions';
import MiniProductForCart from '../MiniProductForCart/MiniProductForCart';

const Cart = ({cart, addToCart}) => {
    const subTotal = cart.reduce((st, pd) => st += (pd.price * pd.quantity), 0);
    const tax = subTotal * .015;
    const delivary = subTotal * .06;
    const total = subTotal + tax + delivary;

    return (
        <>
            <h6>From <strong>Gulshan Plaza Restaurant</strong></h6>
            <h6>Arriving in 7-10 min</h6>
            <h6>107 Road No 8</h6>
            {
                cart.map(pd => <MiniProductForCart toCart={addToCart} data={pd} key={pd.id}></MiniProductForCart>)
            }
            <div className="d-flex pt-2 justify-content-between">
                <div className="text-left">
                    <h6>Subtotal: {cart.length} items</h6>
                    <h6>Tax:</h6>
                    <h6>Delivary fee:</h6>
                    <Text variant="xLarge">Total:</Text>
                </div>
                <div className="text-right">
                    <h6>$ {+subTotal.toFixed(2)}</h6>
                    <h6>$ {+tax.toFixed(2)}</h6>
                    <h6>$ {+delivary.toFixed(2)}</h6>
                    <Text variant="xLarge">$ {+total.toFixed(2)}</Text>
                </div>
            </div>
            <br />
            <Form.Control className="bg-danger text-white" size="lg" type="button" value="Place Order" />
        </>
    );
};

const mapStateToProps = state => {
    return {
        cart : state.cart
    }
}

const mapDispatchToProps = {
    addToCart : addToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);