import { Image, Text } from '@fluentui/react';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from '@uifabric/react-cards';
import React from 'react';
import { Form } from 'react-bootstrap';

const MiniProductForCart = ({toCart, data}) => {
    const {quantity, name, photo1Url, shortDescription, price} = data;


    return (
        <>
            <Card className="rounded bg-white p-2" horizontal>
                <Card.Item >
                    <Image width={110} className="rounded" src={photo1Url} alt="Placeholder image." />
                </Card.Item>
                <Card.Section>
                    <Text variant="medium">{name}</Text>
                    <div className="d-flex align-items-center">
                        <Text>$ {price}</Text>
                            <div className="w-50 ml-3 d-flex align-items-center justify-content-around">
                                <FontAwesomeIcon onClick={() => toCart({...data, quantity : -1})} icon={faMinus}></FontAwesomeIcon>
                                <Form.Control width={10} className="text-center font-weight-bold" value={quantity} />
                                <FontAwesomeIcon onClick={() => toCart({...data, quantity : 1})} className="text-danger" icon={faPlus}></FontAwesomeIcon>
                            </div>
                    </div>
                    <Text variant="small">{shortDescription}</Text>
                </Card.Section>
            </Card>
            
        </>
    );
};

export default MiniProductForCart;