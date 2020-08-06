import api from 'app/ApiConfig.js'

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
            console.log(response)
            dispatch({
                type:SET_NOWTASK,
                data:response.data
            })
        })
}