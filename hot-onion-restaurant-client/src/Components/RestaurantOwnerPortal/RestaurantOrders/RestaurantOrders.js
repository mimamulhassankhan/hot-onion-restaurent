import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAllOrders } from '../../../Redux/Actions/RestaurantActions';
import MainContentLayout from '../../MainContentLayout/MainContentLayout';

const RestaurantOrders = ({allOrders, restaurantOwnerInfo, setAllOrders}) => {
    console.log(restaurantOwnerInfo);
    const [myRestaurantOrders, setMyRestaurantOrders] = useState([]);
    useEffect(() => {
        const myProd = [];
        allOrders.map(order => {
            const {cartDetails} = order;
            const filteredCart =  cartDetails && cartDetails.filter(crt => crt?.restaurantId === restaurantOwnerInfo._id);
            console.log(filteredCart);
            if(filteredCart.length > 0){
                myProd.push({...order, cartDetails: filteredCart});
                return {...order, cartDetails: filteredCart}
            }
            else{
                return {}
            }
        })
        setMyRestaurantOrders(myProd);
    }, [allOrders, restaurantOwnerInfo]);

    const handleOrderStatusChangeClick = (orderDetails, status) => {
        const statusObject = {orderStatus: status};
        fetch(`http://localhost:5000/updateOrderInfo/${orderDetails?._id}`,{
            method: 'PATCH',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(statusObject)
        })
        .then(res => res.json())
        .then(returnedData => {
            if(returnedData){
                const newOrderList = allOrders.filter(order => order._id !== orderDetails?._id);
                const singleOrderInfo = {...orderDetails, orderStatus: status};
                setAllOrders([...newOrderList, singleOrderInfo]);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <>
        <MainContentLayout title="My Orders">
            <Table className="text-center rounded m-2 bg-white p-3" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Order No</th>
                        <th>Details</th>
                        <th>Order Status</th>
                        <th>Next Step</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myRestaurantOrders.length > 0 && myRestaurantOrders.map((order, idx) => {
                            const {cartDetails} = order;
                            return (
                                <tr key={order._id} className="align-middle">
                                    <td>{idx + 1}</td>
                                    <td>{order._id}</td>
                                    <td>
                                        {
                                            cartDetails.length > 0 && cartDetails.map(crt => {
                                                return(
                                                    <div key={crt._id}>
                                                        <li>{crt?.foodName} <br/>Quantity: {crt?.quantity}</li>
                                                    </div>
                                                )
                                            })
                                        }
                                    </td>
                                    <td><Badge variant={order?.orderStatus === 'pending' ? 'primary' : order?.orderStatus === 'rejected' ? 'danger' : order?.orderStatus === 'accept' ? 'success' : 'warning' }>{order?.orderStatus?.toUpperCase()}</Badge></td>
                                    <td>
                                        <button className="btn btn-info mr-3" onClick={() => handleOrderStatusChangeClick(order,'accept')} disabled={order?.orderStatus === 'rejected' || order?.orderStatus === 'accept'}>Accept</button>
                                        <button className="btn btn-danger" onClick={() => handleOrderStatusChangeClick(order, 'rejected')} disabled={order?.orderStatus === 'rejected' || order?.orderStatus === 'accept'}>Reject</button>
                                    </td>
                                    <td className="d-flex justify-content-around" >
                                        <Button variant="info"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </MainContentLayout>
        </>
    );
};

const mapStateToProps = state => {
    return{
        allOrders: state.allOrders,
        restaurantOwnerInfo: state.restaurantOwnerInfo
    }
}

const mapDispatchToProps = {
    setAllOrders: setAllOrders
  }

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantOrders);