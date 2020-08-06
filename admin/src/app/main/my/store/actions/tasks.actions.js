import api from 'app/ApiConfig.js'
import * as globalActions from 'app/store/actions';

export const GET_TASK = '[MY APP TASK] GET TASK'
export const SET_NOWTASK = '[MY APP TASK] SET NOW TASK'

export function getTask(params){
    const request = api.get('/task/tasktype',{params})

    return dispatch=>
        request.then(response=>{
            console.log(response)
            dispatch({
                type:GET_TASK,
                data:response.data
            })
        })
}
export function setNowTask(params){
    
    console.log('post')
    const request = api.post('/task/nowtask',{params})

    return dispatch=>
        request.then(response=>{
            if(response.data.result == true)
            {
                dispatch({
                    type:SET_NOWTASK,
                    data:response.data.myTask
                })
            }else
            {

                dispatch({
                    type:globalActions.SHOW_MESSAGE,
                    options:{message:'You can not select this task!'}
                })
                dispatch({
                    type:SET_NOWTASK,
                    data:null
                })
            }
        })
}