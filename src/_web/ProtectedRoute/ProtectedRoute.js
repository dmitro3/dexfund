import React from "react";
import { useSelector } from 'react-redux'
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
    const state = useSelector((state) => state);
    return (
        <Route
            {...restOfProps}
            render={(props) =>
                state.connect.account ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRoute;