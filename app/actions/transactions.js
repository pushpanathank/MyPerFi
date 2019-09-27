import axios from '../utils/api';
import url from '../config/api';
import { ActionTypes, Strings } from '../constants/';
import { getLanguage } from '../utils/common';



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
