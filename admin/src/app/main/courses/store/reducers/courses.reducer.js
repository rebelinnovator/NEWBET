import * as Actions from '../actions';

const initialState = {
    entities          : [],
    searchText        : ''
};

const coursesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_COURSES: {
			return {
				...state,
				entities: action.payload
			};
		}
		case Actions.SET_COURSES_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
        default:
        {
            return state;
        }
    }
};

export default coursesReducer;
