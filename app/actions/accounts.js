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
