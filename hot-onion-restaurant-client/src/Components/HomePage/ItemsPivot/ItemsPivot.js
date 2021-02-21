import { Pivot, PivotItem } from '@fluentui/react';
import React from 'react';
import FoodItems from '../FoodItems/FoodItems';

const ItemsPivot = ({foods}) => {
    console.log(foods);
    const breakfastItems = foods.filter(pd => pd.foodCategory === 'breakfast');
    const lunchItems = foods.filter(pd => pd.foodCategory === 'lunch');
    const dinnerItems = foods.filter(pd => pd.foodCategory === 'dinner')
    return (
        <div>
            <Pivot>
                {
                    breakfastItems.length > 0 &&
                    <PivotItem className="d-flex flex-wrap justify-content-start mt-3 mb-3" headerText="Breakfast" headerButtonProps={{ 'data-order': 1, 'data-title': 'My Files Title', }} >
                        {
                            breakfastItems && breakfastItems.map(pd => <FoodItems data={pd} key={pd._id}></FoodItems>)
                        }
                    </PivotItem>
                }
                {
                    lunchItems.length > 0 &&
                    <PivotItem className="d-flex flex-wrap justify-content-start mt-3 mb-3" headerText="Launch">
                        {
                            lunchItems && lunchItems.map(pd => <FoodItems data={pd} key={pd.id}></FoodItems>)
                        }
                    </PivotItem>
                }
                {
                    dinnerItems.length > 0 && 
                    <PivotItem className="d-flex flex-wrap justify-content-start mt-3 mb-3" headerText="Dinner">
                        {
                            dinnerItems && dinnerItems.map(pd => <FoodItems data={pd} key={pd.id}></FoodItems>)
                        }
                    </PivotItem>
                }
            </Pivot>
        </div>
    );
};

export default ItemsPivot;