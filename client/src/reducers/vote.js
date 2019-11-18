
import {
    MAKE_VOTE,
    UPDATE_VOTE,
    REMOVE_VOTE,
    GET_VOTE,
    VOTING
} from "../action/types";

const initialState = {
    vote: [],
    loading: true,   
}

export default (state = initialState, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case MAKE_VOTE:
            return {
                ...state,
                vote: payload
            };
        
        case GET_VOTE:
            return {
                ...state,
                vote: payload,
                loading: false
            };
        // case ADD_GONGSI:
        //     return {
        //         ...state,
        //         bulletin: [payload, ...state.bulletin],
        //         loading: false,
        //         standby: {}
        //     };
        // case REMOVE_GONGSI:
        //     return {
        //         ...state,
        //         bulletin: state.gongsi.filter(gongsi => gongsi._id !== payload),
        //         loading: false
        //     };
        // case POST_ERROR:
        //     return {
        //         ...state,
        //         error: payload,
        //         loading: false
        //     };
        default:
            return state;
    }
};