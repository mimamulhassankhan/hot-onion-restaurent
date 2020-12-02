import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const OwnerAuth = ({ownerIsSingedIn, children, ...rest}) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
            ownerIsSingedIn ? (
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
        ownerIsSingedIn: state.ownerIsSingedIn
    }
}
export default connect(mapStateToProps)(OwnerAuth);