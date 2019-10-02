import axios from '../utils/api';
import url from '../config/apiv1';
import { ActionTypes, Strings } from '../constants/';
import { getLanguage } from '../utils/common';

export const signin = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.signin,  {payloads: payloads})
  .then(res => {
    // console.log("res", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        if(res.data.status==200){
          dispatch({ type: ActionTypes.SIGNIN, data: res.data.data.user });
        }
        return res.data
      } else {
        return res
      }
    });
}

export const signup = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.signup,  {payloads: payloads}).then(res => {
    // console.log("res", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data;
      } else {
        return res;
      }
    })
}

export const logoutUser = () => dispatch => {
  dispatch({ type: ActionTypes.RESETTRANSACTIONS });
  dispatch({ type: ActionTypes.RESETACCOUNTS });
  dispatch({ type: ActionTypes.RESETSETTINGS });
  dispatch({ type: ActionTypes.RESETBILLS });
  return dispatch({ type: ActionTypes.LOGOUT });
  
}

export const forgotpassword = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.signup,  {payloads: payloads}).then(res => {
    // console.log("res", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data;
      } else {
        return res;
      }
    })  
}

