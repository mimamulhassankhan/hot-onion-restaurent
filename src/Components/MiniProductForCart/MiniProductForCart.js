import { Image, Text } from '@fluentui/react';
import { Card } from '@uifabric/react-cards';
import React from 'react';

const MiniProductForCart = ({data}) => {
    const {name, photo1Url, shortDescription, price} = data;
    return (
        <>
            <div className="rounded p-2 m-1" style={{backgroundColor: '#605e5c'}}>
                <Card className="rounded bg-white" horizontal>
                    <Card.Item >
                        <Image width={110} className="rounded" src={photo1Url} alt="Placeholder image." />
                    </Card.Item>
                    <Card.Section>
                        <Text variant="medium">{name}</Text>
                        <Text>$ {price}</Text>
                        <Text variant="small">{shortDescription}</Text>
                    </Card.Section>
                </Card>
            </div>
            
        </>
    );
};

export default MiniProductForCart;