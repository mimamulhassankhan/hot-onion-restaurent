import { Pivot, PivotItem } from '@fluentui/react';
import React from 'react';
import FoodItems from '../FoodItems/FoodItems';

const ItemsPivot = ({products}) => {
    console.log(products);
    const breakfastItems = products.filter(pd => pd.category === 'breakfast');
    const lunchItems = products.filter(pd => pd.category === 'lunch');
    const dinnerItems = products.filter(pd => pd.category === 'dinner')
    return (
        <div>
            <Pivot>
                <PivotItem className="d-flex flex-wrap justify-content-around mt-3 mb-3" headerText="Breakfast" headerButtonProps={{ 'data-order': 1, 'data-title': 'My Files Title', }} >
                    {
                        breakfastItems && breakfastItems.map(pd => <FoodItems data={pd} key={pd.id}></FoodItems>)
                    }
                </PivotItem>
                <PivotItem className="d-flex flex-wrap justify-content-around mt-3 mb-3" headerText="Launch">
                    {
                        lunchItems && lunchItems.map(pd => <FoodItems data={pd} key={pd.id}></FoodItems>)
                    }
                </PivotItem>
                <PivotItem className="d-flex flex-wrap justify-content-around mt-3 mb-3" headerText="Dinner">
                    {
                        dinnerItems && dinnerItems.map(pd => <FoodItems data={pd} key={pd.id}></FoodItems>)
                    }
                </PivotItem>
            </Pivot>
        </div>
    );
};

export default ItemsPivot;