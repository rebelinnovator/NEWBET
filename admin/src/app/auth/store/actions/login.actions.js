import jwtService from 'app/services/jwtService';
import {setUserData,setUserBalance, setUserBonus, setApplySubmitted} from './user.actions';
// import * as Actions from 'app/store/actions';
import history from 'history.js';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({phonenumber, password})
{
    return (dispatch) =>
        jwtService.signInWithPhoneAndPassword(phonenumber, password)
            .then((user) => {

                    dispatch(setUserData(user.decodedToken));
                    dispatch(setUserBalance(user.balance));
                    console.log(user.bonus)
                    dispatch(setUserBonus(user.bonus))
                    dispatch(setApplySubmitted(user.todaySubmitBonus))

                    history.push({
                        pathname: '/'
                    });
                    return dispatch({
                        type: LOGIN_SUCCESS
                    });
                }
            )
            .catch(error => {
                console.log(error)
                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: error
                });
            });
}
