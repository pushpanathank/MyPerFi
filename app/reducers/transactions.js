// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';
import { generateUUIDInt } from '../utils/common';
import { getAccSum,getCurrentMonthTotalSpend } from '../utils/accounts';

// Reducers (Modifies The State And Returns A New State)
const transactions = (state = initialState.transactions, action) => {
  switch (action.type) {
    case ActionTypes.ADDTRANSACTION: {
      let transaction=action.transaction,
      id= generateUUIDInt(transaction.date);
      if(transaction['id']){
        id = transaction['id'];
      }
      transaction['id']=id;
      state.items[id] = transaction;
      return {...state, currMonthSpend: getCurrentMonthTotalSpend(state.items)};
    }
    case ActionTypes.REMOVETRANSACTION: {
      let id=action.id;
      delete state.items[id];
      return {...state, currMonthSpend: getCurrentMonthTotalSpend(state.items)};
    }

    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default transactions;