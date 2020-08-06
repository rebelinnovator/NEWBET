import * as Actions from '../actions';

const initialState = {
	data: null,
	params: {},
	contentDialog: {
		type: 'new',
		props: {
			open: false
		},
		data : null
	}
};

const contentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_COURSE: {
			return {
				...state,
				data: action.payload,
				params: action.params
			};
		}
		case Actions.SAVE_COURSE: {
			return {
				...state,
				data: action.payload,
				params: action.params
			};
        }
		case Actions.OPEN_NEW_CONTENT_DIALOG:
        {
            return {
                ...state,
                contentDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_CONTENT_DIALOG:
        {
            return {
                ...state,
                contentDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_CONTENT_DIALOG:
        {
            return {
                ...state,
                contentDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_CONTENT_DIALOG:
        {
            return {
                ...state,
                contentDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
		default: {
			return state;
		}
	}
};

export default contentsReducer;
