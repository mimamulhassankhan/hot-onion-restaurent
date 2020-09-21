import React from 'react';
import { Card } from '@uifabric/react-cards';
import { ActionButton, Icon, Stack, Text } from '@fluentui/react';
import { Link } from 'react-router-dom';

const FoodItems = () => {
    return (
        <Link to={`/food/item`}>
            <Card>
                <Card.Section fill verticalAlign="end" >
                    <Text variant="large" >
                    NOVEMBER
                    </Text>
                    <Text variant="superLarge">
                    26
                    </Text>
                </Card.Section>
                <Card.Section>
                    <Text variant="small" >
                    Category
                    </Text>
                    <Text >Contoso marketing customer visit and survey results</Text>
                </Card.Section>
                <Card.Section>
                    <Text variant="small" >
                    Tuesday 2:00-4:30 pm
                    </Text>
                    <Text variant="small" >
                    Conf Room 34/1301
                    </Text>
                </Card.Section>
                <Card.Item grow={1}>
                    <span />
                </Card.Item>
                <Card.Section horizontal >
                    <ActionButton text="12 Attendees" />
                    <ActionButton text="4 Accepted"  />
                    <ActionButton text="3 Declined"  />
                </Card.Section>
                <Card.Section horizontal >
                    <Icon iconName="RedEye"  />
                    <Icon iconName="SingleBookmark"  />
                    <Stack.Item grow={1}>
                    <span />
                    </Stack.Item>
                    <Icon iconName="MoreVertical" />
                </Card.Section>
            </Card>
        </Link>
            
    );
};

export default FoodItems;