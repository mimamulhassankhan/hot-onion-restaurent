import { Label, Pivot, PivotItem } from '@fluentui/react';
import React from 'react';
import { connect } from 'react-redux';
import FoodItems from '../FoodItems/FoodItems';

const ItemsPivot = ({products}) => {
    return (
        <div>
            <Pivot>
                <PivotItem className="d-flex flex-wrap justify-content-around mt-3 mb-3" headerText="Breakfast" headerButtonProps={{ 'data-order': 1, 'data-title': 'My Files Title', }} >
                    {
                        products && products.map(pd => <FoodItems data={pd} key={pd.id}></FoodItems>)
                    }
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

const mapStateToProps = state => {
    return {  
        products: state.products
    }
}

export default connect(mapStateToProps) (ItemsPivot);