import { ActionTypes } from '../constants/';

export const addBankAcc = payloads => dispatch => {
  return dispatch({ type: ActionTypes.ADDBANKACC, bankAcc: payloads });
}

export const removeBankAcc = payloads => dispatch => {
  return dispatch({ type: ActionTypes.REMOVEBANKACC, id: payloads });
}

export const addWalletAcc = payloads => dispatch => {
  return dispatch({ type: ActionTypes.ADDWALLETACC, walletAcc: payloads });
}

export const removeWalletAcc = payloads => dispatch => {
  return dispatch({ type: ActionTypes.REMOVEWALLETACC, id: payloads });
}
