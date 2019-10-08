// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';
import { generateUUID } from '../utils/common';
import { getAccSum } from '../utils/accounts';

// Reducers (Modifies The State And Returns A New State)
const accounts = (state = initialState.accounts, action) => {
  switch (action.type) {
    case ActionTypes.RESETACCOUNTS: {
      return {...initialState.accounts};
    }
    case ActionTypes.ADDACC: {
      let items = state.items,
      id= generateUUID();
      if(action.acc['id']){
        id = action.acc['id'];
      }
      action.acc['id']=id;
      items[id]=action.acc;
      return {
        ...state,
        items:items,
      }
    }
    case ActionTypes.REMOVEACC: {
      let items = state.items;
      delete(items[action.id]);
      return {
        ...state,
        items:items,
      }
    }

    case ActionTypes.UPDATEACCOUNTTOTAL: {
      let transaction = action.transaction,
          add = action.add, // (0=>remove, 1=>add)
          items = state.items,
          type = transaction.type ? 1:-1, //(1=>income, -1=>expense)
          diff = (transaction.amount - transaction.initAmt) * type;
          if(add==0){
            //subract the transaction
            diff = transaction.initAmt * type * -1;
          }
        delete transaction['initAmt'];
      if(items.hasOwnProperty(transaction.acid)){
        items[transaction.acid].bal = parseInt(items[transaction.acid].bal) + diff;
      }
      return {
        ...state,
        items:items,
      }
    }

    case ActionTypes.UPDATEACCOUNTTRANSFERTOTAL: {
      let transaction = action.transaction,
          add = action.add, // (0=>remove, 1=>add)
          items = state.items,
          diff = (transaction.amount - transaction.initAmt);
          if(add==0){
            //subract the transaction
            diff = transaction.initAmt * -1;
          }
        delete transaction['initAmt'];
      if(items.hasOwnProperty(transaction.frmAcc)){
        items[transaction.frmAcc].bal = parseInt(items[transaction.frmAcc].bal) - diff;
      }
      if(items.hasOwnProperty(transaction.toAcc)){
        items[transaction.toAcc].bal = parseInt(items[transaction.toAcc].bal) + diff;
      }
      return {
        ...state,
        items:items,
      }
    }

    case ActionTypes.BACKUPACCOUNT: {
      let data=action.data,
          items = state.items,
          walletAcc = state.walletAcc;
      for(let a in data){
        if(data[a]){
          if(items.hasOwnProperty(a)){
            items[a]['sync'] = 0;
          }
        }
      }
      return {
        ...state,
        items:items,
      }
    }
    case ActionTypes.RESTOREACCOUNT: {
      let data=action.data,
          items = state.items;
      for(let a in data){
        items[a] = data[a];
      }
      return {
        ...state,
        items:items,
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