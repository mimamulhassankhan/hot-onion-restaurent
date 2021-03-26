import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAllOrders } from '../../../Redux/Actions/RestaurantActions';
import MainContentLayout from '../../MainContentLayout/MainContentLayout';
import UpdateOrder from '../UpdateOrder/UpdateOrder';



const MyOrderList = ({allOrders, setAllOrders, user, allFoods}) => {
    const [showUpdateOrderModal, setShowUpdateOrderModal] = useState(false);
    const handleUpdateOrderModalClose = () => setShowUpdateOrderModal(false);
    const [onlyMyOrders, setOnlyMyOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState({});

    useEffect(() =>{
        const myOrders = allOrders.filter(order => order.userId === user._id);
        setOnlyMyOrders(myOrders); 
    }, [allOrders, user]);
    return (
        <>
        <MainContentLayout title="My Orders">
            <Table className="text-center rounded m-2 bg-white p-3" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Order No</th>
                        <th>Items</th>
                        <th>Delivary Details</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        onlyMyOrders.length > 0 ?
                        onlyMyOrders.map((order, idx) => {
                            const {cartDetails, supplierDetails} = order;
                            return(
                                <tr key={order._id} className="align-center">
                                    <td>{idx+1}</td>
                                    <td>{order._id}</td>
                                    <td>
                                        <>
                                            {
                                                cartDetails && cartDetails.map(item => {
                                                    return (
                                                        <>
                                                        <p className="d-block"><div>{item?.foodName} <br/>Quantity: {item?.quantity}</div></p>
                                                        </>
                                                    )
                                                })
                                            }
                                        </>
                                    </td>
                                    <td>
                                        <p>{supplierDetails?.deliveryPersonName}</p>
                                        <p>{supplierDetails?.deliveryPersonContact}</p>
                                    </td>
                                    <td>
                                        <Badge pill variant={order?.orderStatus === 'pending' ? 'primary': 'danger'}>
                                            {(order && order?.orderStatus?.toUpperCase()) || 'Pending'}
                                        </Badge>
                                    </td>
                                    <td className="d-flex justify-content-around" >
                                        <Button variant="success" onClick={ () => {setSelectedOrder(order); setShowUpdateOrderModal(true)}}><FontAwesomeIcon icon={faEye} /></Button>
                                    </td>
                                </tr>
                            )
                        }
                        )
                        :
                        <h6 className="text-center text-danger my-3">Sorry Nothing to show</h6>
                    }
                    
                </tbody>
            </Table>
            <UpdateOrder show={showUpdateOrderModal} orderDetails={selectedOrder} handleClose={handleUpdateOrderModalClose}></UpdateOrder>
        </MainContentLayout>
        </>
    );
};

const mapStateToProps = state => {
    return{
        allOrders: state.allOrders,
        user: state.user,
        allFoods: state.allFoods
    }
}

const mapDispatchToProps = {
    setAllOrders: setAllOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrderList);