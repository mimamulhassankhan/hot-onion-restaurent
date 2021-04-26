import { Text } from '@fluentui/react';
import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { addToCart, setAllOrders } from '../../Redux/Actions/RestaurantActions';
import MiniProductForCart from '../MiniProductForCart/MiniProductForCart';
import emailjs from 'emailjs-com';
import './Cart.css';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useResponsiveFontSize from './useResponsiveFontSize';
require('dotenv').config();

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
      () => ({
        style: {
          base: {
            fontSize,
            color: "#424770",
            letterSpacing: "0.025em",
            fontFamily: "Source Code Pro, monospace",
            "::placeholder": {
              color: "#aab7c4"
            }
          },
          invalid: {
            color: "#9e2146"
          }
        }
      }),
      [fontSize]
    );
  
    return options;
};

const Cart = ({cart, user, addToCart, allOrders, setAllOrders, buttonDisabledState, allSuppliers}) => {
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const [paymentMethodology, setPaymentMethodology] = useState('cashOnDelivery');
    const [cardError, setCardError] = useState(paymentMethodology === 'cashOnDelivery' ? false : true);

    const subTotal = cart.reduce((st, pd) => st += (pd.foodPrice * pd.quantity), 0);
    const tax = subTotal * .015;
    const delivary = subTotal * .06;
    const total = subTotal + tax + delivary;

    const processPaymentInformation = async () => {
        if(paymentMethodology === 'cashOnDelivery'){
            const paymentDetails = {
                paymentStatus: 'pending',
                paymentType: 'Cash on delivery',
                paymentId: Math.random().toString()
            }

            return paymentDetails;
        }
        else if(paymentMethodology === 'cardPayment'){
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardNumberElement),
            });
        
            if (error) {
                console.log('[error]', error);
            } else {
                console.log('[PaymentMethod]', paymentMethod);
                const paymentDetails = {
                    paymentStatus: 'paid',
                    paymentType: 'Card Payment',
                    paymentId: paymentMethod.id
                }
                return paymentDetails;
            }
        }
    }


    const handlePlaceOrder = async () =>{
        if (!stripe || !elements) {
            return;
        }

        const payment = await processPaymentInformation();
        const [selectSupplier] = allSuppliers.filter(supplier => supplier.deliveryPersonActiveStatus === 'active');

        const orderDetails = {
            userId: user._id,
            userMail: user.email,
            cartDetails: cart,
            supplierDetails: selectSupplier,
            paymentStatus: payment.paymentStatus,
            paymentType: payment.paymentType,
            paymentId: payment.paymentId,
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
            emailjs.send(process.env.REACT_APP_EMAIL_SERVICE_ID, process.env.REACT_APP_EMAIL_TEMPLATE_ID, orderDetails, process.env.REACT_APP_EMAIL_USER_ID)
            .then(responseResult => {
                history.push(`/dashboard/myorders`);
            })
            .then(error => {
                console.log('error :', error);
            });
        })
        .catch(err => console.log(err));

    }
    return (
        <>
            <h6>Payment Method</h6>
            <label className="container_div">Cash On Delivary
                <input type="radio" checked={paymentMethodology === 'cashOnDelivery'} onChange={() => setPaymentMethodology('cashOnDelivery')} name="radio" />
                <span className="checkmark_div"></span>
            </label>
            <label className="container_div">Card Payment
                <input type="radio" onChange={() => setPaymentMethodology('cardPayment')} name="radio" />
                <span className="checkmark_div"></span>
            </label>

            {
                paymentMethodology === 'cardPayment' && 
                <>
                    <label>
                        Card number
                        <CardNumberElement
                            options={options}
                            onChange={({error}) => {
                                error ? setCardError(true) : setCardError(false);
                            }}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Expiration date
                        <CardExpiryElement
                            options={options}
                            onChange={({error}) => {
                                error ? setCardError(true) : setCardError(false);
                            }}
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        CVC
                        <CardCvcElement
                            options={options}
                            onChange={({error}) => {
                                error ? setCardError(true) : setCardError(false);
                            }}
                        />
                    </label>
                    <br />
                    <br />
                </>
            }
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
            <input className="btn btn-danger rounded-pill btn-block" onClick={() => handlePlaceOrder()} type="button" value="Place Order" disabled={buttonDisabledState || cart.length <=0 || cardError }/>
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