import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { setAllSuppliers } from '../../../Redux/Actions/RestaurantActions';
import MainContentLayout from '../../MainContentLayout/MainContentLayout';

const AddDeliveryPerson = ({allSuppliers, setAllSuppliers}) => {

    const { register, handleSubmit, errors, reset } = useForm();
    
    const onSubmit = data => {
        fetch('http://localhost:5000/addSupplyPerson', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(doc => {
            if(doc){
                const newSupplier = [doc, ...allSuppliers];
                setAllSuppliers(newSupplier);
                reset({});
            }
        })
    }
    console.log(allSuppliers);
    return (
        <>
            <MainContentLayout title="Delivery Person List">
                <Table className="text-center rounded m-2 bg-white p-3" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact Number</th>
                            <th>Service Area</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSuppliers.map(supplier => 
                                (
                                    <tr>
                                        <td>{supplier?.deliveryPersonName}</td>
                                        <td>{supplier?.deliveryPersonContact}</td>
                                        <td>{supplier?.deliveryPersonServiceArea}</td>
                                        <td>{supplier?.deliveryPersonActiveStatus}</td>
                                    </tr>
                                )
                               )
                        }
                    </tbody>
                </Table>
            </MainContentLayout>

            <MainContentLayout className="my-2" title="Add Delivery Person">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="deliveryPersonName">Name</label>
                                <input type="text" ref={register({ required: true })} name="deliveryPersonName" className="form-control" placeholder="Person Name"/>
                                {errors.deliveryPersonName && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="deliveryPersonContact">Restaurant Name</label>
                                <input type="text" name="deliveryPersonContact" ref={register({ required: true })}  className="form-control" placeholder="Contact Number"/>
                                {errors.deliveryPersonContact && <span className="text-danger">This field is required</span>}
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="form-group">
                                <label htmlFor="deliveryPersonServiceArea">Service Area</label>
                                <select name="deliveryPersonServiceArea" ref={register({ required: true })} className="form-control">
                                    <option value="uttara">Uttara</option>
                                    <option value="gulshan">Gulshan</option>
                                    <option value="banani">Banani</option>
                                    <option value="mohakhali">Mohakhali</option>
                                </select>
                                {errors.deliveryPersonServiceArea && <span className="text-danger">This field is required</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="deliveryPersonActiveStatus">Active Status</label>
                                <select name="deliveryPersonActiveStatus" ref={register({ required: true })} className="form-control">
                                    <option value="active">Active</option>
                                    <option value="busy">Busy</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                {errors.deliveryPersonActiveStatus && <span className="text-danger">This field is required</span>}
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <div className="d-flex justify-content-end">
                        <input type="submit" className="btn btn-danger rounded-pill" value="Save" />
                    </div>
                </form>
            </MainContentLayout>
        </>
    );
};

const mapStateToProps = state => {
    return{
        allSuppliers: state.allSuppliers
    }
}

const mapDispatchToProps = {
    setAllSuppliers: setAllSuppliers
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeliveryPerson);