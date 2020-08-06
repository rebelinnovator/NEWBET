import * as Actions from '../actions';
import store from '../../../store';

const initialState = {
    role: 'guest'
};

const user = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_USER_DATA:
        {
            return {
                ...initialState,
                ...action.payload
            };
        }
        case Actions.SET_USER_BALANCE:
        {
            console.log('BALANCE REDUCER')
         //   console.log(state)
         //   console.log(action.data)
            return{
                ...state,
                balance:action.data
            }   
        }
        case Actions.SET_USER_BONUS:
        {
            
            console.log('BONUS REDUCER')
         //   console.log(state)
         //   console.log(action.data)
            return{
                ...state,
                bonus:action.data
            }   
        }
        case Actions.SET_USER_APPLYSUBMITTED:
            {
                console.log(action.data)
                return{
                    ...state,
                    todaySubmitBonus:action.data
                }
            }
        case Actions.REMOVE_USER_DATA:
        {
            return {
                ...initialState
            };
        }
        case Actions.USER_LOGGED_OUT:
        {
            return initialState;
        }
        default:
        {
            return state
        }
    }
};

export default user;
