import React from "react";
import { useSelector } from 'react-redux'
import LoadingOverlay from 'react-loading-overlay-ts'
import customLoadingGif from './../fund-details-page/overview/components/portfolio/assets/loading_spinning.gif';

const LoaderOverlary = ({ children }) => {
    const state = useSelector((state) => state);
    return (
        <LoadingOverlay
            active={state.loader.isActive}
            spinner={<img style={{height: "128px", width: "128px"}} src={customLoadingGif} />}
            text=''
        >
            {children}
        </LoadingOverlay>
    )
}

export default LoaderOverlary