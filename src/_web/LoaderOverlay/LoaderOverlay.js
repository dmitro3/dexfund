import React from "react";
import { useSelector } from 'react-redux'
import LoadingOverlay from 'react-loading-overlay-ts'
import BounceLoader from 'react-spinners/BounceLoader'

const LoaderOverlary = ({children }) => {
    const state = useSelector((state) => state);
    console.log(state)

    return (
        <LoadingOverlay
            active={state.loader.isActive}
            spinner={<BounceLoader />}
        >
            {children}
        </LoadingOverlay>
    )
}

export default LoaderOverlary