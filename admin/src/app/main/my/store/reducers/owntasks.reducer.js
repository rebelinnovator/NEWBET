import * as Actions from '../actions'

const initialState = {
    ownTasks:[],
}
const ownTaskReducer = (state = initialState, action) =>{
    switch(action.type)
    {
        case Actions.GET_OWNTASK:
            {
                console.log(action.data.owntasks)
                return {
                    ...state,
                    ownTasks:action.data.owntasks
                }
            }
        case Actions.POST_GIVEUPTASK:
            {
                return{
                    ...state,
                    ownTasks:action.data.owntasks
                }
            }
            default:
                return state
    }
}
export default ownTaskReducer