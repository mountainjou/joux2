import {
    ADD_GONGSI,
    REMOVE_GONGSI,
    UPDATE_GONGSI,
    GET_GONGSI,
    POST_ERROR,
    GET_GONGSI_DETAIL
} from "../actions/types";

const initialState = {
    gongsi: []
}

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_GONGSI:
            return {
                ...state,
                gongsi: payload
            };
        case ADD_GONGSI:
            return {
                ...state,
                bulletin: [payload, ...state.bulletin],
                loading: false,
                standby: {}
            };
        case REMOVE_GONGSI:
            return {
                ...state,
                bulletin: state.gongsi.filter(gongsi => gongsi._id !== payload),
                loading: false
            };
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case GET_GONGSI_DETAIL:
                return {
                    ...state,
                    gongsiDetail: payload
                };
        default:
            return state;
    }
};