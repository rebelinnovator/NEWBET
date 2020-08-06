import * as UserActions from './user.actions';
import * as Actions from 'app/store/actions';
import jwtService from 'app/services/jwtService';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export function submitRegister({phonenumber,nickname, password, otpnumber,recomnumber,otpsessionId})
{
    //var model = param.model
    return (dispatch) =>
        jwtService.createUser({
            phonenumber,
            nickname,
            password,
            otpnumber,
            recomnumber,
            otpsessionId
        })
            .then((msg) => {
                    console.log("success")
                    console.log(msg)
                    dispatch(Actions.showMessage({
                          message :msg
                    }))
                    //dispatch(UserActions.setUserData(user));
                    return dispatch({
                        type: REGISTER_SUCCESS
                    });
                }
            )
            .catch(error => {
                console.log("register_error")
                console.log(error)
                /*
                dispatch({
                    type:Actions.SHOW_MESSAGE,
                    message: 'RegisterError'
                })
                */
                return dispatch({
                    type   : REGISTER_ERROR,
                    payload: error
                });
            });
}
