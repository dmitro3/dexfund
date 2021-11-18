import React from "react";
import { useSelector } from 'react-redux'
import LoadingOverlay from 'react-loading-overlay-ts'
import './LoaderOverlay.css';
const LoaderOverlary = ({ children }) => {
    const state = useSelector((state) => state);
    return (
        <LoadingOverlay
            active={state.loader.isActive}
            spinner
            text='Processing. Please wait ....'
        >
            {children}
        </LoadingOverlay>
    )
}

export default LoaderOverlary