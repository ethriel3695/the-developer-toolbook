import { INCREMENTER } from '../actions/actionTypes';

const initialState = { 
    count: 0 
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENTER:
        return {
            ...state,
            count: state.count + action.count
        }
        default:
            return state;
    }
}

export default reducer;