
  import {LOADER_ACTIVE, LOADER_IN_ACTIVE}  from  './../actions/LoaderAction'
  const initialState = {
    isActive: false,
  };
  
  export default function loaderOverlayReducer(state = initialState, action) {
    switch (action.type) {
      case LOADER_ACTIVE:
        return {
          isActive:  true
        };
      case LOADER_IN_ACTIVE:
        return {
            isActive:  false
        };

      default:
        return state;
    }
  }
  