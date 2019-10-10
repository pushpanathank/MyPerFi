import axios from '../utils/api';
import url from '../config/apiv1';
import { ActionTypes } from '../constants/';
import { getLanguage, getCurrencySymbol } from '../utils/common';


export const setLanguage = payloads => dispatch => {
  dispatch({ type: ActionTypes.SHOWMODAL, showModal: false });
  return dispatch({ type: ActionTypes.LANGUAGECODE, languageId: payloads.id , languageCode: payloads.code,languageSet: payloads.set });
}

export const setCurrency = payloads => dispatch => {
  return dispatch({ type: ActionTypes.SETCURRENCY, currency: payloads, currSymbol: getCurrencySymbol(payloads)});
}

export const setBudget = payloads => dispatch => {
  return dispatch({ type: ActionTypes.SETBUDGET, budget: payloads});
}

export const backup = payloads => dispatch => {
	let trans = {}, accs = {}, transactions=payloads.transactions, accounts=payloads.accounts, bills=payloads.bills;
    for(let t in transactions){
      if(transactions[t]['sync']){
        trans[t] = transactions[t];
      }
    }
    for(let a in accounts){
      if(accounts[a]['sync']){
        accs[a] = accounts[a];
      }
    }

    let data = { user_id : payloads.user_id, transactions: JSON.stringify(trans), accounts: JSON.stringify(accs), bills: JSON.stringify(bills)};
    console.log("data", data);
  return axios.post(url.backup,  {payloads: data})
  .then(res => {
    console.log("res", res.data);
      if(res.status == 200){
        if(res.data.status==200){
          dispatch({ type: ActionTypes.BACKUPTRANSACTION, data: res.data.data.trans });
          dispatch({ type: ActionTypes.BACKUPACCOUNT, data: res.data.data.accs });
        }
        return res.data
      } else {
        return res
      }
    });
}

export const restore = payloads => dispatch => {
  return axios.post(url.restore,  {payloads: payloads})
  .then(res => {
    // console.log("res", res.data);
      if(res.status == 200){
        if(res.data.status==200){
          dispatch({ type: ActionTypes.RESTORETRANSACTION, data: res.data.data.trans });
          dispatch({ type: ActionTypes.RESTOREACCOUNT, data: res.data.data.accs });
          dispatch({ type: ActionTypes.RESTOREBILLS, data: res.data.data.bills });
        }
        return res.data
      } else {
        return res
      }
    });
}