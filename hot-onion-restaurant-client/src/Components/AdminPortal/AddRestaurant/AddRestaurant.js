import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { addRestaurant } from '../../../Redux/Actions/RestaurantActions';

const AddRestaurant = ({restaurants, addRestaurant}) => {
    const { register, handleSubmit, errors, reset } = useForm();

    const onSubmit = data => {

        fetch('https://mighty-meadow-40482.herokuapp.com/addRestaurant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(doc => {
            if(doc){
                const addNewRestaurant = [doc, ...restaurants];
                addRestaurant(addNewRestaurant);
                reset({});
            }
        })

    }
    return (
        <>
            <form className="p-5 bg-white rounded m-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="restaurantName">Restaurant Name</label>
                                <input type="text" ref={register({ required: true })} name="restaurantName" placeholder="Restaurant Name" className="form-control"/>
                                {errors.restaurantName && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="restaurantAddress">Address</label>
                                <textarea rows={3} ref={register({ required: true })} name="restaurantAddress" placeholder="Restaurant Address" className="form-control"/>
                                {errors.restaurantAddress && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="restaurantUserName">Restaurant Username</label>
                                <input type="text" ref={register({ required: true })} name="restaurantUserName" placeholder="Restaurant UserName" className="form-control"/>
                                {errors.restaurantUserName && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group">
                                <label>Map Location</label>
                                <br/>
                                <input type="text" ref={register({ required: true })} name="restaurantMapLatitude" placeholder="Latitude" className="mx-2"/>
                                {errors.restaurantMapLatitude && <span className="text-danger">This field is required</span>}
                                <input type="text" ref={register({ required: true })} name="restaurantMapLongitude" placeholder="Longitude" />
                                {errors.restaurantMapLongitude && <span className="text-danger">This field is required</span>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="restaurantCategory">Category</label>
                                <select name="restaurantCategory" ref={register({ required: true })} className="form-control">
                                    <option value="chinese">Chinese</option>
                                    <option value="mexican">Mexican</option>
                                    <option value="thai">Thai</option>
                                    <option value="italian">Italian</option>
                                </select>
                                {errors.restaurantCategory && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="restaurantServiceArea">Service Area</label>
                                <select name="restaurantServiceArea" ref={register({ required: true })} className="form-control">
                                    <option value="uttara">Uttara</option>
                                    <option value="gulshan">Gulshan</option>
                                    <option value="banani">Banani</option>
                                    <option value="mohakhali">Mohakhali</option>
                                </select>
                                {errors.restaurantServiceArea && <span className="text-danger">This field is required</span>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="restaurantpassword">Password for Login</label>
                                <input type="text" ref={register({ required: true })} name="restaurantpassword" className="form-control" placeholder="Password"/>
                                {errors.restaurantpassword && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="restaurantLogo">Restaurant Logo (Optional Now!)</label>
                                <input name="restaurantLogo" className="form-control" placeholder="Upload Logo" type="file" />
                                {errors.restaurantLogo && <span className="text-danger">This field is required</span>}
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