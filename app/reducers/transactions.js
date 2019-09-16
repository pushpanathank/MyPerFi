// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';
import { generateUUID } from '../utils/common';
import { getAccSum } from '../utils/accounts';

// Reducers (Modifies The State And Returns A New State)
const transactions = (state = initialState.transactions, action) => {
  switch (action.type) {
    case ActionTypes.ADDTRANSACTION: {
      let id= generateUUID();
      if(action.transaction['id']){
        id = action.transaction['id'];
      }
      action.transaction['id']=id;
      state[id]=action.transaction;
      return state;
    }

    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default transactions;