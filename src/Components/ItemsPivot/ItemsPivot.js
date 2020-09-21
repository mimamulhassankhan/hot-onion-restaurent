import { Label, Pivot, PivotItem } from '@fluentui/react';
import React from 'react';
import FoodItems from '../FoodItems/FoodItems';

const ItemsPivot = () => {
    return (
        <div>
            <Pivot>
                <PivotItem headerText="Breakfast" headerButtonProps={{ 'data-order': 1, 'data-title': 'My Files Title', }} >
                    <FoodItems></FoodItems>
                </PivotItem>
                <PivotItem headerText="Launch">
                    <Label styles={{marginTop: 10}}>Pivot #2</Label>
                </PivotItem>
                <PivotItem headerText="Dinner">
                    <Label styles={{marginTop: 10 }}>Pivot #3</Label>
                </PivotItem>
            </Pivot>
        </div>
    );
};

export default ItemsPivot;