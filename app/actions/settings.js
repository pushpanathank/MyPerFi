import { ActionTypes } from '../constants/';
import { getLanguage, getCurrencySymbol } from '../utils/common';


export const setLanguage = payloads => dispatch => {
  dispatch({ type: ActionTypes.SHOWMODAL, showModal: false });
  return dispatch({ type: ActionTypes.LANGUAGECODE, languageId: payloads.id ,languageSet: payloads.set });
}

export const setCurrency = payloads => dispatch => {
  return dispatch({ type: ActionTypes.SETCURRENCY, currency: payloads, currSymbol: getCurrencySymbol(payloads)});
}