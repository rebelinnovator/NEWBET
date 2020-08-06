import api from 'app/ApiConfig.js'

export const GET_OWNTASK = '[MY APP OWNTASK] GET TASK'
export const POST_GIVEUPTASK = '[MY APP GIVEUPTASK] POST TASK'

export function getOwnTasks(params){

    const request = api.get('/task/mytask',{params})

    return dispatch=>
        request.then(response=>{
            console.log(response)
            dispatch({
                type:GET_OWNTASK,
                data:response.data
            })
        })
}
export function giveupTask(params){
    
    const request = api.post('/task/giveup',{params})

    return dispatch=>
    request.then(response=>{
        console.log(response)
        dispatch({
            type:POST_GIVEUPTASK,
            data:response.data
        })
    })

}