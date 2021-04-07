import { Text } from 'office-ui-fabric-react';
import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../../Redux/Actions/RestaurantActions';
import MiniProductForCart from '../../MiniProductForCart/MiniProductForCart';

const MiniCart = ({cart}) => {
    const subTotal = cart.reduce((st, pd) => st += (pd.foodPrice * pd.quantity), 0);
    const tax = subTotal * .015;
    const delivary = subTotal * .06;
    const total = subTotal + tax + delivary;
    return (
        <>
            {
                cart.length > 0 ?
                <div className="p-2">
                {
                    cart.map(pd => <MiniProductForCart from="minicart" toCart={addToCart} data={pd} key={pd.id}></MiniProductForCart>)
                }
                <div className="d-flex pt-2 justify-content-between">
                    <div className="text-left">
                        <p>Subtotal: {cart.length} items</p>
                        <p>Tax:</p>
                        <p>Delivary fee:</p>
                        <Text variant="xLarge">Total:</Text>
                    </div>
                    <div className="text-right">
                        <p>$ {+subTotal.toFixed(2)}</p>
                        <p>$ {+tax.toFixed(2)}</p>
                        <p>$ {+delivary.toFixed(2)}</p>
                        <Text variant="xLarge">$ {+total.toFixed(2)}</Text>
                    </div>
                </div>
                <br />
                <Link to={`/dashboard/customer`}>
                    <button  className="btn btn-danger btn-block text-white rounded-pill">Checkout</button>
                </Link>
                </div>
                :
                <>
                    <p className="p-3 text-danger">Noting Here,<br/> Continue Shopping</p>
                </>
            }
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
export default connect(mapStateToProps, mapDispatchToProps)( MiniCart);