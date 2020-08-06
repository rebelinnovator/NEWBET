import * as Actions from '../actions'
import * as userActions from 'app/auth/store/actions';

const initialState = {
    complaints    :   [] 
    
}
const complaintReducer = (state = initialState, action) =>{
    switch(action.type)
    {
        case Actions.NEW_COMPLAINT:
            {
                
                return {
                    ...state,
                    complaints:action.data.complaints
                }
            }
        case Actions.GET_COMPLAINT:
            {
                return{
                    ...state,
                    complaints:action.data.complaints
                }
            }
            default:
                return state
    }
}
export default complaintReducer