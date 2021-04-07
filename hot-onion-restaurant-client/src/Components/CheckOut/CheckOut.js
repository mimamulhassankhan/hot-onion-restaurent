import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { addLoggedinUser } from '../../Redux/Actions/RestaurantActions';
import Cart from '../Cart/Cart';

const CheckOut = ({user, addLoggedinUser}) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const [buttonDisabledState, setButtonDisabledState] = useState(true);

    let {district, businessName, flatNo, roadNo, phoneNo} = user?.userShippingAddress;
    const onSubmit = userShippingAddress => {
        setButtonDisabledState(false);
        let updatedUserShippingAddress = userShippingAddress;
        delete updatedUserShippingAddress.specialInstruction;
        delete updatedUserShippingAddress.submitButton;
        fetch(`http://localhost:5000/updateUser/${user?._id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedUserShippingAddress)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                let newUser = user;
                newUser.userShippingAddress = updatedUserShippingAddress;
                addLoggedinUser(newUser);
            }
        });
    }

    return (
        <>
            <Container className="mt-3">
                <Row>
                    <Col>
                        <h3>Edit Delivary Details</h3>
                        <hr className="w-75 ml-0"/>
                        <form className="w-75" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <input type="text" className="form-control" ref={register({ required: true })} name="district" defaultValue={district || ''} placeholder="Area or District"/>
                                {errors.district && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" ref={register({ required: true })} name="roadNo" defaultValue={roadNo || ''} placeholder="Road No"/>
                                {errors.roadNo && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" ref={register({ required: true })} name="flatNo" defaultValue={flatNo || ''} placeholder="Flat or Suite"/>
                                {errors.flatNo && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" ref={register({ required: true })} name="phoneNo" defaultValue={phoneNo || ''} placeholder="Phone Number"/>
                                {errors.phoneNo && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" ref={register()} name="businessName" defaultValue={businessName || ''} placeholder="Business Name"/>
                            </div>
                            <div className="form-group">
                                <textarea rows="2" className="form-control" ref={register()} name="specialInstruction" placeholder="Special Instruction"/>
                            </div>
                            <div className="form-group">
                                <input type="submit" name="submitButton" className="btn btn-block btn-danger rounded-pill" ref={register()} value="Save & Continue" disabled={!buttonDisabledState}/>
                            </div>
                        </form>
                    </Col>
                    <Col className="mt-5" md={4}>
                        <Cart buttonDisabledState={buttonDisabledState}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

const mapStateToProps = state => {
    return{
        user: state.user
    }
}

const mapDispatchToProps = {
    addLoggedinUser : addLoggedinUser
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);