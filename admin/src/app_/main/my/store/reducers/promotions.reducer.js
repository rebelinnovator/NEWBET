import * as Actions from '../actions'

const initialState = {
    promotions:[],
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
        case Actions.ACCEPT_PROMOTION:
            {
                return{
                    ...state,
                    promotions:action.data.promotions
                }
            }
            default:
                return state
    }
}
export default promotionsReducer