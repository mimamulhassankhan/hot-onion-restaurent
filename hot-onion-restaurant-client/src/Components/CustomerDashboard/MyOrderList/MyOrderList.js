import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setAllOrders } from '../../../Redux/Actions/RestaurantActions';
import { Table } from 'rsuite';



const MyOrderList = ({allOrders, setAllOrders, user}) => {
    const [onlyMyOrders, setOnlyMyOrders] = useState([]);
    const { Column, HeaderCell, Cell } = Table;

    useEffect(() =>{
        const myOrders = allOrders.filter(order => order.userId === user._id);
        setOnlyMyOrders(myOrders); 
    }, [allOrders, user]);
    console.log(onlyMyOrders);
    return (
        <>
           <Table
            height={400}
            data={onlyMyOrders}
            >
                <Column width={150} align="center" >
                    <HeaderCell> Order Id</HeaderCell>
                    <Cell dataKey="_id" />
                </Column>

                <Column width={200} >
                    <HeaderCell>Delivery Person</HeaderCell>
                    <Cell dataKey="supplierDetails.deliveryPersonName" />
                </Column>

                <Column width={70}>
                    <HeaderCell>Payment Type</HeaderCell>
                    <Cell dataKey="paymentType" />
                </Column>

                <Column width={70}>
                    <HeaderCell>Payment Status</HeaderCell>
                    <Cell dataKey="city" />
                </Column>

                <Column width={70}>
                    <HeaderCell>Order Status</HeaderCell>
                    <Cell dataKey="orderStatus" />
                </Column>
            </Table>
        </>
    );
};

const mapStateToProps = state => {
    return{
        allOrders: state.allOrders,
        user: state.user
    }
}

const mapDispatchToProps = {
    setAllOrders: setAllOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrderList);