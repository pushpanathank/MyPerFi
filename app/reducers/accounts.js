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

    case ActionTypes.UPDATEACCOUNTTOTAL: {
      let transaction = action.transaction,
          add = action.add, // (0=>remove, 1=>add)
          bankAcc = state.bankAcc,
          walletAcc = state.walletAcc,
          type = transaction.type ? 1:-1, //(1=>income, -1=>expense)
          diff = (transaction.amount - transaction.initAmt) * type;
          if(add==0){
            //subract the transaction
            diff = transaction.initAmt * type * -1;
          }
        delete transaction['initAmt'];
      if(bankAcc.hasOwnProperty(transaction.acid)){
        bankAcc[transaction.acid].bal = parseInt(bankAcc[transaction.acid].bal) + diff;
      }
      if(walletAcc.hasOwnProperty(transaction.acid)){
        walletAcc[transaction.acid].bal = parseInt(walletAcc[transaction.acid].bal) + diff;
      }
      return {
        ...state,
        bankAcc:bankAcc,
        walletAcc:walletAcc,
        bankAccSum:getAccSum(bankAcc),
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