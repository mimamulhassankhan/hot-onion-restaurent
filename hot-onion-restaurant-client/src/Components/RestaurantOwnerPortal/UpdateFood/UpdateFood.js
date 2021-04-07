import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import {setAllFoods} from '../../../Redux/Actions/RestaurantActions';

const UpdateFood = ({show, handleClose, foodDetails, allFoods, setAllFoods}) => {
    const { register, handleSubmit, errors } = useForm();
    const handleOrderInfoUpdateClick = (data) => {
        fetch(`http://localhost:5000/updateFoodInfo/${foodDetails?._id}`,{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(returnedData => {
            if(returnedData){
                const newFoodList = allFoods.filter(user => user._id !== foodDetails._id);
                const singleFoodInfo = {...foodDetails, foodName: data?.foodName, foodShortDescription: data?.foodShortDescription, foodLongDescription: data?.foodLongDescription, foodPrice: data?.foodPrice};
                setAllFoods([...newFoodList, singleFoodInfo]);
                handleClose();
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <Modal size="md" show={show} onHide={handleClose} animation={false}>
        <form onSubmit={handleSubmit(handleOrderInfoUpdateClick)}>
            <Modal.Header closeButton>
                <Modal.Title>Order Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <div className="form-group">
                            <input type="text" ref={register({ required: true })} name="foodName" placeholder="Food Name" className="form-control" defaultValue={foodDetails?.foodName}/>
                            {errors.foodName && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="form-group">
                            <textarea rows={2} ref={register({ required: true })} name="foodShortDescription" placeholder="Food Short Description" className="form-control" defaultValue={foodDetails?.foodShortDescription}/>
                            {errors.foodShortDescription && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="form-group">
                            <textarea rows={3} ref={register({ required: true })} name="foodLongDescription" placeholder="Food Long Description" className="form-control" defaultValue={foodDetails?.foodLongDescription}/>
                            {errors.foodLongDescription && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>
                    <div>
                        <div className="form-group">
                            <textarea rows={3} ref={register({ required: true })} name="foodPrice" placeholder="Food Price" className="form-control" defaultValue={foodDetails?.foodPrice}/>
                            {errors.foodPrice && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>
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
    );
};

const mapStateToProps = state => {
    return{
        allFoods: state.allFoods
    }
}

const mapDispatchToProps = {
    setAllFoods : setAllFoods
}


export default connect(mapStateToProps, mapDispatchToProps)(UpdateFood);