import { ActionTypes } from '../constants/';

export const addTransaction = payloads => dispatch => {
  return dispatch({ type: ActionTypes.ADDTRANSACTION, transaction: payloads });
}

export const removeTransaction = payloads => dispatch => {
  return dispatch({ type: ActionTypes.REMOVETRANSACTION, id: payloads });
}
