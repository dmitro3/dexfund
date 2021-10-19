import { REGISTER_SUCCESS, REGISTER_FAILURE, RESET_REGISTER } from '../actions/AuthActions';

const initialState = {
    registerSuccess: false,
    feedbackMessage: null,
    error: null
}

export default function registerReducer(state = initialState, action) {

    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                registerSuccess: true,
                feedbackMessage: "Contul a fost creat cu succes",
                error: null
            };

        case REGISTER_FAILURE:
            return {
                registerSuccess: false,
                feedbackMessage: "Adresa de email este deja folosită",
                error: action.payload.error
            };

        case RESET_REGISTER:
            return {
                registerSuccess: false,
                feedbackMessage: null,
                error: null
            }

        default:
            return state;
    }
}