import React from 'react';
import { Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { updateOwnerLogin } from '../../../Redux/Actions/RestaurantActions';

const CustomLogin = ({updateOwnerLogin}) => {
    const { register, handleSubmit, errors, reset } = useForm();

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const onSubmit = data => {
        fetch(`https://mighty-meadow-40482.herokuapp.com/restaurant/${data.restaurantId}`)
        .then(res => res.json())
        .then(doc => {
            console.log(doc);
            if(doc){
                // const addNewRestaurant = [doc, ...restaurants];
                // addRestaurant(addNewRestaurant);
                updateOwnerLogin(true);
                reset();
                history.replace(from);
            }
        })

    }
    return (
        <div>
            <form className="w-25 text-center mx-auto border rounded p-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group row">
                        <div className="col-12">
                            <Image className="mx-auto" width={150} src="/Images/Image/Group 1151.png" alt="logo"/>
                            <div className="form-group text-left">
                                <label htmlFor="restaurantId">Restaurant Id</label>
                                <input type="text" ref={register({ required: true })} name="restaurantId" placeholder="Restaurant Id" className="form-control form-control-lg"/>
                                {errors.restaurantId && <span className="text-danger">This field is required</span>}
                            </div>
                            <Link to={"/signup"}>
                                <p className="pt-3">No account?? don't worry. Create Account here.</p>
                            </Link>
                        </div>
                    </div>

                    <div className="form-group text-right">
                        <button type="submit" className="btn btn-dark px-5">SignIn</button>
                    </div>
                </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ownerIsSingedIn: state.ownerIsSingedIn
    }
}

const mapDispatchToProps = {
    updateOwnerLogin: updateOwnerLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomLogin);