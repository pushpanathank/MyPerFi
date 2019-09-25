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