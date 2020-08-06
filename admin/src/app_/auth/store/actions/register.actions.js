import * as UserActions from './user.actions';
// import * as Actions from 'app/store/actions';
import jwtService from 'app/services/jwtService';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export function submitRegister({phonenumber, password, otpnumber,recomnumber})
{
    return (dispatch) =>
        jwtService.createUser({
            phonenumber,
            password,
            otpnumber,
            recomnumber
        })
            .then((user) => {
                    dispatch(UserActions.setUserData(user));
                    return dispatch({
                        type: REGISTER_SUCCESS
                    });
                }
            )
            .catch(error => {
                console.log("register_error")
                console.log(error)
                return dispatch({
                    type   : REGISTER_ERROR,
                    payload: error
                });
            });
}
