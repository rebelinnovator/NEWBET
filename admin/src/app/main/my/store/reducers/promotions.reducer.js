import * as Actions from '../actions'
import * as userActions from 'app/auth/store/actions';

const initialState = {
    promotions          :   {},
    bonus               :   [],
    applySubmitted      :   false,
    applybonus          :   []
    
}
const promotionsReducer = (state = initialState, action) =>{
    switch(action.type)
    {
        case Actions.GET_PROMOTION:
            {
                return {
                    ...state,
                    promotions:action.data.promotions
                }
            }
        case Actions.GET_BONUS:
            {
                return{
                    ...state,
                    bonus:action.data.bonus
                }
            }
        case Actions.POST_APPLYBONUS:
            {
                console.log('reducer')
                console.log(action.data.applySubmitted)
                
                //userActions.setApplySubmitted(1)
                return{
                    ...state,
                    applySubmitted:action.data.applySubmitted
                }
            }
        case Actions.GET_APPLYBONUS:
            {

                return{
                    ...state,
                    applybonus:action.data.applybonus
                }
            }
        case Actions.ACCEPT_PROMOTION:
            {
                return{
                    ...state,
                    promotions:action.data.promotions
                }
            }
        case Actions.SUBMIT_PROMOTION_BALANCE:
            {
                return {
                    ...state
                }
            }
            default:
                return state
    }
}
export default promotionsReducer