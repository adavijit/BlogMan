import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>(
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
    )} />
)