import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const OwnerAuth = ({restaurantOwnerInfo, children, ...rest}) => {
    console.log(restaurantOwnerInfo);
    return (
        <Route
            {...rest}
            render={({ location }) =>
            restaurantOwnerInfo?._id ? 
                (
                    children
                ) : (
                <Redirect
                    to={{
                    pathname: "/ownerlogin",
                    state: { from: location }
                    }}
                />
                )
            }
            />
    );
};

const mapStateToProps = state => {
    return {
        restaurantOwnerInfo: state.restaurantOwnerInfo
    }
}
export default connect(mapStateToProps)(OwnerAuth);