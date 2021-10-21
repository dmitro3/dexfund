export const LOADER_ACTIVE = "LOADER_ACTIVE";
export const LOADER_IN_ACTIVE = "LOADER_IN_ACTIVE";


export const activateLoaderOverlay = () => {
    return (dispatch) => {
        try {
            dispatch({ type: LOADER_ACTIVE, payload: { isActive: true } });
        } catch (error) {
            dispatch({ type: LOADER_IN_ACTIVE });
        }
    };
};

export const deactivateLoaderOverlay = () => {
    return (dispatch) => {
        try {
            dispatch({ type: LOADER_IN_ACTIVE });
            // save records
        } catch (error) {
            dispatch({ type: LOADER_IN_ACTIVE });
        }
    };
};