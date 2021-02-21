import React from 'react';
import { Card } from '@uifabric/react-cards';
import {  Image, Text } from '@fluentui/react';
import './FoodItems.css';
import { Link } from 'react-router-dom';
import { addToCart } from '../../../Redux/Actions/RestaurantActions';
import { connect } from 'react-redux';

const FoodItems = ({data, addToCart}) => {
    const {foodPrice, foodName, foodLongDescription, foodImage1, _id} = data;
    return (
        <>
            <Card className="m-3 rounded text-center hvr-shadow shadow" style={{minWidth: '300px', minHeight: '300'}}>
                <Link to={`/food/item=${_id}`} className="text-decoration-none">
                    <Card.Section verticalAlign="end" >
                        <Card.Item fill>
                            <Image className="rounded-top mx-auto pt-3" width={170} src={foodImage1} alt="Placeholder image." />
                        </Card.Item>
                    </Card.Section>
                    <Card.Section className="p-2">
                        <Card.Section>
                            <Text variant="xLarge" >{foodName}</Text>
                        </Card.Section>
                        <Card.Section>
                            <Text variant="small" className="text-muted"> {foodLongDescription} </Text>
                        </Card.Section>
                        <Card.Section>
                            <Text variant="xxLarge">
                                $ {foodPrice}
                            </Text>
                        </Card.Section>
                    </Card.Section>
                </Link>
                <Card.Section >
                    <input type="button" onClick={() => addToCart({...data, quantity : 1})} value="Add To Cart" className="btn btn-info rounded-pill m-2"/>
                </Card.Section>
            </Card>
        </>
            
    );
};

const mapStateToProps = state => {
    return{
        cart: state.cart
    }
}

const mapDispatchToProps = {
    addToCart : addToCart
}
export default connect(mapStateToProps, mapDispatchToProps)(FoodItems);