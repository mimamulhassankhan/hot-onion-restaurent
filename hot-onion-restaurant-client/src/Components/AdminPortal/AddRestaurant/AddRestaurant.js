import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { addRestaurant } from '../../../Redux/Actions/RestaurantActions';

const AddRestaurant = ({restaurants, addRestaurant}) => {
    const { register, handleSubmit, errors, reset } = useForm();

    const onSubmit = data => {

        fetch('http://localhost:5000/addRestaurant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(doc => {
            if(doc){
                const addNewRestaurant = [doc, ...restaurants];
                addRestaurant(addNewRestaurant);
                reset();
            }
        })

    }
    return (
        <>
            <form className="p-5 bg-white rounded m-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="restaurantname">Restaurant Name</label>
                                <input type="text" ref={register({ required: true })} name="restaurantname" placeholder="Restaurant Name" className="form-control form-control-lg"/>
                                {errors.restaurantname && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="restaurantaddress">Address</label>
                                <textarea rows={3} ref={register({ required: true })} name="restaurantaddress" placeholder="Restaurant Address" className="form-control form-control-lg"/>
                                {errors.restaurantaddress && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="restaurantusername">Restaurant Username</label>
                                <input type="text" ref={register({ required: true })} name="restaurantusername" placeholder="Restaurant UserName" className="form-control form-control-lg"/>
                                {errors.restaurantusername && <span className="text-danger">This field is required</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="restaurantpassword">Password for Login</label>
                                <input ref={register({ required: true })} name="restaurantpassword" className="form-control form-control-lg" placeholder="Password"/>
                                {errors.restaurantpassword && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="restaurantlogo">Restaurant Logo (Optional Now!)</label>
                                <button className="btn btn-outline-success btn-block"><input name="restaurantlogo" className="form-control bg-transparent" placeholder="Upload Logo" type="file" /></button>
                                {errors.restaurantlogo && <span className="text-danger">This field is required</span>}
                            </div>
                        </div>
                    </div>

                    <div className="form-group text-right">
                        <button type="submit" className="btn btn-dark px-5">Send</button>
                    </div>
                </form>
        </>
    );
};

const mapStateToProps = state => {
    return {
        restaurants : state.restaurants
    }
}

const mapDispatchToProps = {
    addRestaurant : addRestaurant
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurant);