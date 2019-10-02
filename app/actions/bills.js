import { ActionTypes } from '../constants/';

export const addBiller = payloads => dispatch => {
  return dispatch({ type: ActionTypes.ADDBILLER, bill: payloads });
}

export const removeBiller = payloads => dispatch => {
  return dispatch({ type: ActionTypes.REMOVEBILLER, id: payloads });
}

