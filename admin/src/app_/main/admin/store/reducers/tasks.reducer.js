import * as Actions from '../actions';

const initialState = {
    task:[],
    contentDialog:{
        type:'new',
        props:{
            open:false
        },
        data:null
    }
}

const tasksReducer = (state = initialState, action) =>{
    switch(action.type)
    {
        case Actions.GET_TASK:
        {
            //console.log(action.data)
            return{
                ...state,
                task:action.data.taskTypes
            }
        }
        case Actions.POST_TASK:
        {
            console.log(action.data)
            return{
                ...state,
                task:action.data.taskTypes
            }
        }
        case Actions.TASK_NEW_DIALOG:
        {
            console.log("asdf")
            return{
                ...state,
                contentDialog:{
                    type:'new',
                    props:{
                        open:true
                    },
                    data:null
                }
            }   
        }
        case Actions.TASK_EDIT_DIALOG:
        {
            console.log("asdf")
            return{
                ...state,
                contentDialog:{
                    type:'edit',
                    props:{
                        open:true
                    },
                    data:action.data
                }
            }   
        }
        case Actions.TASK_NEW_DIALOG_CLOSE:
            {
                return{
                    ...state,
                    contentDialog:{
                        type:'new',
                        props:{
                            open:false
                        },
                        data:null
                    }
                }   
            }
        case Actions.TASK_EDIT_DIALOG_CLOSE:
            {
                return{
                    ...state,
                    contentDialog:{
                        type:'edit',
                        props:{
                            open:false
                        },
                        data:null
                    }
                }   
            }
        default:
        {
            return state;
        }
    }
}

export default tasksReducer