import { Text } from '@fluentui/react';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { addToCart, setAllOrders } from '../../Redux/Actions/RestaurantActions';
import MiniProductForCart from '../MiniProductForCart/MiniProductForCart';
import './Cart.css';

const Cart = ({cart, user, addToCart, allOrders, setAllOrders, buttonDisabledState, allSuppliers}) => {
    const history = useHistory();
    const subTotal = cart.reduce((st, pd) => st += (pd.foodPrice * pd.quantity), 0);
    const tax = subTotal * .015;
    const delivary = subTotal * .06;
    const total = subTotal + tax + delivary;

    const handlePlaceOrder = () =>{
        const [selectSupplier] = allSuppliers.filter(supplier => supplier.deliveryPersonActiveStatus === 'active');
        const orderDetails = {
            userId: user._id,
            cartDetails: cart,
            supplierDetails: selectSupplier,
            paymentStatus: 'pending',
            paymentType: 'Cash on delivery',
            orderStatus: 'pending'
        }

        fetch('http://localhost:5000/addOrder',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(returnedData => {
            const addNewOrder = [returnedData, ...allOrders];
            setAllOrders(addNewOrder);
            history.push(`/dashboard/myorders`);
        })
        .catch(err => console.log(err));

    }
    return (
        <>
            <h6>Payment Method</h6>
            <label className="container_div">Cash On Delivary
                <input type="radio" checked="checked" name="radio" />
                <span className="checkmark_div"></span>
            </label>
            {
                cart.map(pd => <MiniProductForCart toCart={addToCart} data={pd} key={pd._id}></MiniProductForCart>)
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
            <input className="btn btn-danger rounded-pill btn-block" onClick={() => handlePlaceOrder()} type="button" value="Place Order" disabled={buttonDisabledState || cart.length <=0}/>
        </>
    );
};

const mapStateToProps = state => {
    return {
        cart : state.cart,
        user: state.user,
        allSuppliers: state.allSuppliers,
        allOrders: state.allOrders
    }
}

const mapDispatchToProps = {
    addToCart : addToCart,
    setAllOrders : setAllOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);