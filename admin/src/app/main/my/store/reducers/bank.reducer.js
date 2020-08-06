import * as Actions from '../actions'
import * as userActions from 'app/auth/store/actions';

const initialState = {
    bank    :   -1 
    
}
const bankReducer = (state = initialState, action) =>{
    switch(action.type)
    {
        case Actions.GET_BANK:
            {
                return {
                    ...state,
                    bank:action.data.bank
                }
            }
        case Actions.SET_BANK:
            {
                return {
                    ...state,
                    bank:action.data.bank
                }
            }
        case Actions.DEL_BANK:
        {
            return {
                ...state,
                bank:-1
            }
        }
            default:
                return state
    }
}
export default bankReducer