import api from 'app/ApiConfig.js'

export const GET_TASK = '[ADMIN APP TASK] GET TASK'
export const POST_TASK = '[ADMIN APP TASK] POST TASK'
export const TASK_NEW_DIALOG = '[ADMIN APP TASK] NEW TASK DIALOG'
export const TASK_EDIT_DIALOG = '[ADMIN APP TASK] EDIT TASK DIALOG'
export const TASK_NEW_DIALOG_CLOSE = '[ADMIN APP TASK] NEW TASK DIALOG CLOSE'
export const TASK_EDIT_DIALOG_CLOSE = '[ADMIN APP TASK] EDIT TASK DIALOG CLOSE'

export function postTask(params){
    
    const request = api.post('/task/type',params)

    return dispatch =>
        request.then(response =>{
            console.log(response)
            dispatch({
                type:POST_TASK,
                data:response.data
            })
            
        })
}

export function getTask(){
    
    const request = api.get('/task/type')

    return dispatch => 
        request.then(response =>{
            console.log(response)
            dispatch({
                type:GET_TASK,
                data:response.data
            })
        })
        
}
export function openNewTaskDialog(){
    return {
        type:TASK_NEW_DIALOG
    }
}
export function openEditTaskDialog(params){
    return {
        type:TASK_EDIT_DIALOG,
        data:params
    }
}
export function closeNewTaskDialog(){
    return{
        type:TASK_NEW_DIALOG_CLOSE
    }   
}
export function closeEditTaskDialog(){
    return{
        type:TASK_EDIT_DIALOG_CLOSE
    }   
}