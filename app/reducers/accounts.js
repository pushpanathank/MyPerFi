// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';
import { generateUUID } from '../utils/common';
import { getAccSum } from '../utils/accounts';

// Reducers (Modifies The State And Returns A New State)
const accounts = (state = initialState.accounts, action) => {
  switch (action.type) {
    case ActionTypes.ADDBANKACC: {
      let bankAcc = state.bankAcc,
      id= generateUUID();
      if(action.bankAcc['id']){
        id = action.bankAcc['id'];
      }
      action.bankAcc['id']=id;
      bankAcc[id]=action.bankAcc;
      return {
        ...state,
        bankAcc:bankAcc,
        bankAccSum:getAccSum(bankAcc)
      }
    }
    case ActionTypes.REMOVEBANKACC: {
      let bankAcc = state.bankAcc;
      delete(bankAcc[action.id]);
      return {
        ...state,
        bankAcc:bankAcc,
        bankAccSum:getAccSum(bankAcc)
      }
    }
    case ActionTypes.ADDWALLETACC: {
      let walletAcc = state.walletAcc,
      id=generateUUID();
      if(action.walletAcc['id']){
        id = action.walletAcc['id'];
      }
      action.walletAcc['id']=id;
      walletAcc[id]=action.walletAcc;
      return {
        ...state,
        walletAcc:walletAcc,
        walletAccSum:getAccSum(walletAcc)
      }
    }
    case ActionTypes.REMOVEWALLETACC: {
      let walletAcc = state.walletAcc;
      delete(walletAcc[action.id]);
      return {
        ...state,
        walletAcc:walletAcc,
        walletAccSum:getAccSum(walletAcc)
      }
    }

    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default accounts;