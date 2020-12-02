import React from 'react';
import { Card } from '@uifabric/react-cards';
import {  Image, Text } from '@fluentui/react';
import './FoodItems.css';
import { Link } from 'react-router-dom';

const FoodItems = ({data}) => {
    const {price, name, longDescription, photo1Url, id} = data;
    return (
        <>
            <Card className="m-3 rounded hvr-shadow shadow" style={{minWidth: '300px', minHeight: '300'}}>
                <Link to={`/food/item=${id}`} className="text-decoration-none">
                    <Card.Section verticalAlign="end" >
                        <Card.Item fill>
                            <Image className="rounded-top mx-auto pt-3" width={170} src={photo1Url} alt="Placeholder image." />
                        </Card.Item>
                    </Card.Section>
                    <Card.Section className="p-2">
                        <Card.Section>
                            <Text variant="xLarge" >{name}</Text>
                        </Card.Section>
                        <Card.Section>
                            <Text variant="small" className="text-muted"> {longDescription} </Text>
                        </Card.Section>
                        <Card.Section>
                            <Text variant="xxLarge">
                                $ {price}
                            </Text>
                        </Card.Section>
                    </Card.Section>
                </Link>
            </Card>
        </>
            
    );
};

export default FoodItems;