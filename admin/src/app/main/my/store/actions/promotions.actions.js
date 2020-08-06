import api from 'app/ApiConfig.js'
import * as userActions from 'app/auth/store/actions';

export const GET_PROMOTION = '[MY APP PROMOTION] GET PROMOTION'
export const ACCEPT_PROMOTION = '[[MY APP PROMOTION] ACCEPT PROMOTION'
export const SUBMIT_PROMOTION_BALANCE = '[MY APP PROMOTION] SUBMIT PROMOTION'

export const GET_BONUS = '[MY APP PROMOTION] GET BONUS'
export const POST_APPLYBONUS = '[MY APP PROMOTION] POST APPLYBONUS'
export const GET_APPLYBONUS = '[MY APP PROMOTION] GET APPLYBONUS'

export function getPromotion(params){
 //   console.log("action")
  //  console.log(params)
    const request = api.get('/promotion/promotions',{params})

    return dispatch=>
        request.then(response=>{
            console.log(response)
            dispatch({
                type:GET_PROMOTION,
                data:response.data
            })
        })
}

export function getBonus(params){

    const request = api.get('/promotion/bonus',{params})

    return dispatch=>
        request.then(response=>{
            console.log(response)
            dispatch({
                type:GET_BONUS,
                data:response.data
            })
        })
}
export function submitApplyBonus(params){
    const request = api.post('/promotion/postapplybonus',{params})

    return dispatch=>
        request.then(response=>{
            console.log(response)
            if(response.data.applySubmitted == true){
                dispatch({
                    type:userActions.SET_USER_APPLYSUBMITTED,
                    data:1
                })
            }
            dispatch({
                type:POST_APPLYBONUS,
                data:response.data
            })
           
        })
}

export function getApplyRecord(params){

    const request = api.get('/promotion/getapplybonus',{params})

    return dispatch=>
        request.then(response=>{
            console.log(response)
            dispatch({
                type:GET_APPLYBONUS,
                data:response.data
            })
        })
}
export function acceptPromotion(params){
    const request  = api.post('/promotion/accept',{params})

    return dispatch=>
        request.then(response=>{
           // if(response.data.result == 'success'){
                dispatch({
                    type:ACCEPT_PROMOTION,
                    data:response.data
                })
            //}
        }) 
}
export function submitPromotionBalance(param){

    const request = api.post('/promotion/submitbonus',{param})
    return dispatch=>
        request.then(response=>{
            dispatch({
                type:SUBMIT_PROMOTION_BALANCE,
                data:response.data
            })
        })
}