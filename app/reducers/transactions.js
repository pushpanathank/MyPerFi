// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';
import { generateUUID } from '../utils/common';
import { getAccSum } from '../utils/accounts';

// Reducers (Modifies The State And Returns A New State)
const transactions = (state = initialState.transactions, action) => {
  switch (action.type) {
    case ActionTypes.ADDTRANSACTION: {
      let transaction=action.transaction,
      id= generateUUID();
      if(transaction['id']){
        id = transaction['id'];
      }
      transaction['id']=id;
      const trans = { [id]: transaction };
      return {...state, ...trans};
    }

    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default transactions;