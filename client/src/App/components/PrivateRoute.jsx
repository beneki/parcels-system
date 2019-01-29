import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Container } from './'


const authFlow = () => {
    if(localStorage.getItem('user')) {
        const userData = JSON.parse(localStorage.getItem('user'));  

        return {
            hasToken: !!userData.token,
            roleCheck: (allowedRoles) => allowedRoles.indexOf(userData.role) > -1
        };
    } else {
        return null;
    }
};

export const PrivateRoute = ({ component: Component, role, ...rest }) => (
    <Route { ...rest } render={props => (
        authFlow() && authFlow().hasToken
            ? ( authFlow().roleCheck(role)
                    ? <Container> <Component {...props} /> </Container>
                    : <Container><Redirect to={{ pathname: '/not-authorized', state: { from: props.location } }} /></Container>
              )
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)