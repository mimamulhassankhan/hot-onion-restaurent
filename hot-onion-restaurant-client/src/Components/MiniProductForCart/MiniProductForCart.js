import { Image, Text } from '@fluentui/react';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from '@uifabric/react-cards';
import React from 'react';
import { Form } from 'react-bootstrap';

const MiniProductForCart = ({toCart, data, from}) => {
    const {quantity, foodName, foodImage1, foodShortDescription, foodPrice} = data;


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
                                        <FontAwesomeIcon onClick={() => toCart({...data, quantity : -1})} icon={faMinus}></FontAwesomeIcon>
                                        <Form.Control width={10} className="text-center font-weight-bold" defaultValue={quantity} />
                                        <FontAwesomeIcon onClick={() => toCart({...data, quantity : 1})} className="text-danger" icon={faPlus}></FontAwesomeIcon>
                                    </div>
                            </div>
                            <Text variant="small">{foodShortDescription}</Text>
                        </Card.Section>
                    </Card>
                </>
            }
            
        </>
    );
};

export default MiniProductForCart;