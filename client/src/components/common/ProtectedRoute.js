// eslint-disable-next-line
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => auth.isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />}
    />
);


ProtectedRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

let mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ProtectedRoute);
