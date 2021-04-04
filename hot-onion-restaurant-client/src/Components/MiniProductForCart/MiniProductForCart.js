import { Image, Text } from '@fluentui/react';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from '@uifabric/react-cards';
import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeFromCart } from '../../Redux/Actions/RestaurantActions';

const MiniProductForCart = ({toCart, data, from, removeFromCart}) => {
    console.log(data);
    const {_id, quantity, foodName, foodImage1, foodShortDescription, foodPrice} = data;
    return (
        <>
            {
                from === 'minicart'?
                <>
                    <Card className="rounded bg-white p-2" horizontal>
                        <Card.Item >
                            <Image width={90} className="rounded" src={foodImage1} alt="Placeholder image." />
                        </Card.Item>
                        <Card.Section>
                            <Text variant="medium">{foodName}</Text>
                            <div className="d-flex align-items-center">
                                <Text>$ {foodPrice}</Text>
                                    <div className="w-50 ml-3 d-flex align-items-center justify-content-around">
                                        <span>Qty</span><span className="mx-2">{quantity}</span>
                                    </div>
                            </div>
                        </Card.Section>
                        <Card.Section>
                            <button className="closebtn text-danger"  onClick={() => removeFromCart(_id)}>×</button>
                        </Card.Section>
                    </Card>

                </>
                :
                <>
                    <Card className="rounded bg-white p-2" horizontal>
                        <Card.Item >
                            <Image width={110} className="rounded" src={foodImage1} alt="Placeholder image." />
                        </Card.Item>
                        <Card.Section>
                            <Text variant="medium">{foodName}</Text>
                            <div className="d-flex align-items-center">
                                <Text>$ {foodPrice}</Text>
                                    <div className="w-50 ml-3 d-flex align-items-center justify-content-around">
                                        <button onClick={() => toCart({...data, quantity : -1})} disabled={quantity <= 1}><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></button>
                                        <Form.Control width={10} className="text-center font-weight-bold" value={quantity} />
                                        <button onClick={() => toCart({...data, quantity : 1})} ><FontAwesomeIcon className="text-danger" icon={faPlus}></FontAwesomeIcon></button>
                                    </div>
                            </div>
                            <Text variant="small">{foodShortDescription}</Text>
                        </Card.Section>
                        <Card.Section>
                            <button className="closebtn text-danger" onClick={() => removeFromCart(_id)}>×</button>
                        </Card.Section>
                    </Card>
                </>
            }
            
        </>
    );
};

const mapStateToProps = state => {
    return{
        cart: state.cart
    }
}

const mapDispatchToProps = {
    removeFromCart: removeFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniProductForCart);