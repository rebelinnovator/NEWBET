import api from 'app/ApiConfig.js'
import * as userActions from 'app/auth/store/actions';
import * as globalActions from 'app/store/actions';

export const NEW_COMPLAINT = '[MY APP COMPLAINT] NEW COMPLAINT'
export const GET_COMPLAINT = '[MY APP COMPLAINT] GET COMPLAINT'


export function newComplaint(params){
 //   console.log("action")
  //  console.log(params)
    const request = api.post('/complaint',{params})

    return dispatch=>
        request.then(response=>{
            console.log(response)
            if(response.data.success == true){
                dispatch({
                    type:globalActions.SHOW_MESSAGE,
                    options:{message:'Submit Success!'}
                })
                dispatch({
                    type:NEW_COMPLAINT,
                    data:response.data
                })
            }
            
        })
}
export function getComplaint(params){
    const request = api.get('/complaint',{params})

    return dispatch=>
        request.then(response=>{
            //console.log(response)
                dispatch({
                    type:GET_COMPLAINT,
                    data:response.data
                })
            
            
        })   
}