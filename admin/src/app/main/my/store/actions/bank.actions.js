import api from 'app/ApiConfig.js'
import * as userActions from 'app/auth/store/actions';
import * as globalActions from 'app/store/actions';

export const GET_BANK = '[MY APP BANK] GET BANK'
export const SET_BANK = '[MY APP BANK] SET BANK'
export const DEL_BANK = '[MY APP BANK] DEL BANK'

export function getBank(params){
 //   console.log("action")
  //  console.log(params)
    const request = api.get('/bank/getbank',{params})

    return dispatch=>
        request.then(response=>{
            console.log(response)
            dispatch({
                type:GET_BANK,
                data:response.data
            })
        })
}
export function setBank(params){
    const request = api.post('/bank/setbank',{params})

    return dispatch=>
        request.then(response=>{
            console.log(response)
            dispatch({
                type:SET_BANK,
                data:response.data
            })
        })    
}

export function deletebank(params){
    const request = api.post('/bank/delbank',{params})

    return dispatch=>
        request.then(response=>{
          //  if(response.data.success)
          //   console.log(response)

            dispatch({
                type:DEL_BANK,
                data:response.data
            })
        })    
}