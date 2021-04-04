import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { setAllOrders } from '../../../Redux/Actions/RestaurantActions';
import './UpdateOrder.css';

const UpdateOrder = ({show, handleClose, orderDetails, allOrders, setAllOrders, allUsers}) => {
    console.log(orderDetails);
    const { cartDetails, userId } = orderDetails;
    const [userDetails, setUserDetails] = useState({}); 
    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        const [filteredUser] = allUsers.filter(user => user._id === userId);
        setUserDetails(filteredUser);
    },[userId, allUsers]);

    const handleOrderInfoUpdateClick = (data) => {
        fetch(`http://localhost:5000/updateOrderInfo/${orderDetails?._id}`,{
            method: 'PATCH',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(returnedData => {
            if(returnedData){
                const newOrderList = allOrders.filter(order => order._id !== orderDetails._id);
                const singleOrderInfo = {...orderDetails, orderStatus: data?.orderStatus};
                setAllOrders([...newOrderList, singleOrderInfo]);
                handleClose();
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <>
        <Modal size="md" show={show} onHide={handleClose} animation={false}>
            <form onSubmit={handleSubmit(handleOrderInfoUpdateClick)}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="pl-2 parcel-link-table">
                        <table className="mb-3">
                            <tbody>
                                <tr className="table-row-border">
                                    <th>Destination</th>
                                    <td>
                                        {
                                            `Flat: ${userDetails && userDetails?.userShippingDetails?.flatNo}, Road: ${userDetails && userDetails?.userShippingDetails?.roadNo}, ${userDetails && userDetails?.userShippingDetails?.district}`
                                        }
                                    </td>
                                </tr>
                                <tr className="table-row-border">
                                    <th>Ordered Items</th>
                                    <td>
                                        <p className="p-2" style={{backgroundColor: '#f5f5f5'}}>
                                            {
                                                cartDetails && cartDetails.map(item => {
                                                    return (
                                                        <>
                                                        <div key={item._id} className="card">
                                                            <div className="card-body">
                                                                <h6>{item.foodName}</h6>
                                                            </div>
                                                        </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        </p>
                                    </td>
                                </tr>
                                <tr className="table-row-border">
                                    <th>ETA</th>
                                    <td>To be confirmed</td>
                                </tr>
                                <tr className="table-row-border">
                                    <th>Order Status</th>
                                    <td>
                                        <select name="orderStatus" ref={register({ required: true })}>
                                            <option value="cancel">Cancel</option>
                                        </select>
                                        {errors.orderStatus && <span className="text-danger">This field is required</span>}
                                    </td>
                                </tr>
                                <tr className="table-row-border">
                                    <th>Status</th>
                                    <td className="text-danger">Payment Pending</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <input type="submit" className="btn btn-primary rounded" />
                </Modal.Footer>
            </form>
        </Modal>
        </>
    );
};

const mapStateToProps = state => {
    return{
        allOrders: state.allOrders,
        allUsers: state.allUsers
    }
}

const mapDispatchToProps = {
    setAllOrders : setAllOrders
} 

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrder);