import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { setAllFoods } from '../../../Redux/Actions/RestaurantActions';
import MainContentLayout from '../../MainContentLayout/MainContentLayout';

const AddFood = ({restaurantOwnerInfo, allFoods, setAllFoods}) => {
    const { register, handleSubmit, errors, reset } = useForm();
    
    const onSubmit = data => {
        const foodData = new FormData();
        foodData.append('restaurantId', data?.restaurantId);
        foodData.append('foodName', data?.foodName);
        foodData.append('foodShortDescription', data?.foodShortDescription);
        foodData.append('foodLongDescription', data?.foodLongDescription);
        foodData.append('foodCategory', data?.foodCategory);
        foodData.append('foodPrice', data?.foodPrice);
        foodData.append('foodImages', data?.foodImages[0]);
        foodData.append('foodStatus', 'active');

        fetch('http://localhost:5000/writeFood', {
            method: 'POST',
            body: foodData
        })
        .then(res => res.json())
        .then(doc => {
            if(doc){
                const addNewFood = [doc, ...allFoods];
                setAllFoods(addNewFood);
                reset({});
            }
        })
    }
    return (
        <MainContentLayout title="Add Food Item">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md={6}>
                        <div className="form-group">
                            <label htmlFor="restaurantId">Restaurant Id</label>
                            <input type="text" ref={register({ required: true })} name="restaurantId" defaultValue={restaurantOwnerInfo?._id} className="form-control" readOnly/>
                            {errors.restaurantId && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="restaurantName">Restaurant Name</label>
                            <input type="text" name="restaurantName" defaultValue={restaurantOwnerInfo?.restaurantName} className="form-control" readOnly/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="foodName">Food Name</label>
                            <input type="text" ref={register({ required: true })} name="foodName" placeholder="Food Name" className="form-control"/>
                            {errors.foodName && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="foodShortDescription">Short Description</label>
                            <textarea rows={2} ref={register({ required: true })} name="foodShortDescription" placeholder="Short Description" className="form-control"/>
                            {errors.foodShortDescription && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="foodLongDescription">Long Description</label>
                            <textarea rows={3} ref={register({ required: true })} name="foodLongDescription" placeholder="Long Description" className="form-control"/>
                            {errors.foodLongDescription && <span className="text-danger">This field is required</span>}
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="form-group">
                            <label htmlFor="foodCategory">Category</label>
                            <select name="foodCategory" ref={register({ required: true })} className="form-control">
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </select>
                            {errors.foodCategory && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="foodPrice">Restaurant Username</label>
                            <input type="text" ref={register({ required: true })} name="foodPrice" placeholder="Price" className="form-control"/>
                            {errors.foodPrice && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="foodImages">Food Images</label>
                            <input name="foodImages" ref={register({required : true})} placeholder="Food Images" type="file" />
                            {errors.foodImages && <span className="text-danger">This field is required</span>}
                        </div>
                    </Col>
                </Row>
                <hr/>
                <div className="d-flex justify-content-end">
                    <input type="submit" className="btn btn-danger rounded-pill" value="Save" />
                </div>
            </form>
        </MainContentLayout>
    );
};

const mapStateToProps = state => {
    return{
        restaurantOwnerInfo: state.restaurantOwnerInfo,
        allFoods: state.allFoods
    }
}

const mapDispatchToProps = {
    setAllFoods: setAllFoods
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFood);