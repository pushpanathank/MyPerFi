import axios from '../utils/api';
import url from '../config/api';
import { ActionTypes, Strings } from '../constants/';
import { getLanguage } from '../utils/common';

export const backup = payloads => dispatch => {
	let trans = {}, transactions=payloads.transactions;
	for(let t in transactions){
      if(transactions[t]['sync']){
        trans[t] = transactions[t];
      }
    }
    let data = { user_id : payloads.user_id, transactions: JSON.stringify(trans)};
  return axios.post(url.backup,  {payloads: data})
  .then(res => {
    // console.log("res", res.data);
      if(res.status == 200){
        if(res.data.status==200){
          dispatch({ type: ActionTypes.BACKUPSUCCESS, data: res.data.data });
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
          dispatch({ type: ActionTypes.RESTORESUCCESS, data: res.data.data });
        }
        return res.data
      } else {
        return res
      }
    });
}

export const addTransaction = payloads => dispatch => {
  dispatch({ type: ActionTypes.ADDTRANSACTION, transaction: payloads });
  dispatch({ type: ActionTypes.UPDATEACCOUNTTOTAL, transaction: payloads, add:1 });
  return 1;
}

export const removeTransaction = payloads => dispatch => {
  dispatch({ type: ActionTypes.REMOVETRANSACTION, id: payloads.id });
  dispatch({ type: ActionTypes.UPDATEACCOUNTTOTAL, transaction: payloads, add:0 });
  return 1;
}
