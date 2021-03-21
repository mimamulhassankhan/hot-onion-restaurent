import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setAllFoods } from '../../../Redux/Actions/RestaurantActions';
import MainContentLayout from '../../MainContentLayout/MainContentLayout';

const AllFoodItems = ({allFoods, restaurantOwnerInfo}) => {
    const [sellerProducts, setSellerProducts] = useState([]);
    const handleDeleteButtonClick = (FoodId) => {
        fetch(`http://localhost:5000/deleteFood/${FoodId}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(returnedData => {
            if(returnedData){
                const filteredFoods = allFoods.filter(fd => fd._id !== FoodId);
                console.log(filteredFoods);
                setAllFoods(filteredFoods);
            }
        })
        .catch(err => console.log(err));
    };

    useEffect(() =>{
        const sellerProd = allFoods.filter(food => food?.restaurantId === restaurantOwnerInfo?._id);
        setSellerProducts(sellerProd);
    }, [allFoods, restaurantOwnerInfo]);
    
    return (
        <>
        <MainContentLayout title="List Foods">
            <Table className="text-center rounded m-2 bg-white" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Food Id</th>
                        <th>Food Name</th>
                        <th>Price</th>
                        <th>Catrgoty</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sellerProducts.map((food, idx) => 
                        <tr key={food._id} className="align-center">
                            <td>{idx+1}</td>
                            <td>{food._id}</td>
                            <td>{food.foodName}</td>
                            <td>{food.foodPrice}</td>
                            <td>{food.foodCategory}</td>
                            <td className="d-flex justify-content-around" >
                                <Button variant="danger"><FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteButtonClick(food._id)}/></Button>
                                <Button variant="warning"><FontAwesomeIcon icon={faPen} /></Button>
                            </td>
                        </tr>)
                    }
                    
                </tbody>
            </Table>
        </MainContentLayout>
        </>
    );
};

const mapStateToProps = state => {
    return{
        allFoods: state.allFoods,
        restaurantOwnerInfo: state.restaurantOwnerInfo
    }
}

const mapDispatchToProps = {
    setAllFoods : setAllFoods
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFoodItems);