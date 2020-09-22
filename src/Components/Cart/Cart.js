import { Text } from '@fluentui/react';
import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import MiniProductForCart from '../MiniProductForCart/MiniProductForCart';

const Cart = ({cart}) => {
    // cart.map(pd => console.log(pd.price));
    // const sT = cart.reduce((pd, subTotal) => pd.price && subTotal + pd.price, 0);
    // console.log(sT);
    return (
        <>
            <p>From <strong>Gulshan Plaza Restaurant</strong></p>
            <p>Arriving in 7-10 min</p>
            <p>107 Road No 8</p>
            {
                cart.map(pd => <MiniProductForCart data={pd} key={pd.id}></MiniProductForCart>)
            }
            <div className="d-flex justify-content-between">
                <div className="text-left">
                    <p>Subtotal:</p>
                    <p>Tax:</p>
                    <p>Delivary fee:</p>
                    <Text variant="xLarge">Total:</Text>
                </div>
                <div className="text-right mx-auto">
                    <p>$ 120</p>
                    <p>$ 50</p>
                    <p>$ 12</p>
                    <Text variant="xLarge">$ 2000</Text>
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

export default connect(mapStateToProps)(Cart);