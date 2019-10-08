import { ActionTypes } from '../constants/';

export const addAcc = payloads => dispatch => {
  return dispatch({ type: ActionTypes.ADDACC, acc: payloads });
}

export const removeAcc = payloads => dispatch => {
  return dispatch({ type: ActionTypes.REMOVEACC, id: payloads });
}

export const updateAccountTotal = payloads => dispatch => {
  return dispatch({ type: ActionTypes.UPDATEACCOUNTTOTAL, transaction: payloads });
}

export const addTransfer = payloads => dispatch => {
  dispatch({ type: ActionTypes.ADDTRANSACTION, transaction: payloads });
  dispatch({ type: ActionTypes.UPDATEACCOUNTTRANSFERTOTAL, transaction: payloads, add:1 });
  return 1;
}

export const removeTransfer = payloads => dispatch => {
  dispatch({ type: ActionTypes.REMOVETRANSACTION, id: payloads.id });
  dispatch({ type: ActionTypes.UPDATEACCOUNTTRANSFERTOTAL, transaction: payloads, add:0 });
  return 1;
}