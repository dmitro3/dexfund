import React from "react";
import { useSelector } from 'react-redux'
import LoadingOverlay from 'react-loading-overlay-ts'

const LoaderOverlary = ({ children }) => {
    const state = useSelector((state) => state);
    return (
        <LoadingOverlay
            active={state.loader.isActive}
            spinner
            text='Loading. Please wait ....'
        >
            {children}
        </LoadingOverlay>
    )
}

export default LoaderOverlary