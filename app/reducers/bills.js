// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';
import { generateUUID } from '../utils/common';
import { getCurrentBillMonth } from '../utils/accounts';

// Reducers (Modifies The State And Returns A New State)
const bills = (state = initialState.bills, action) => {
  switch (action.type) {
    case ActionTypes.RESETBILLS: {
      return {...initialState.bills};
    }

    case ActionTypes.ADDBILLER: {
      let items = state.items,
      month= action.bill['curr'] ? 0 : getCurrentBillMonth(),
      id= generateUUID();

      if(action.bill['id']){
        id = action.bill['id'];
      }
      action.bill['id']=id;
      if(!state.hasOwnProperty(month)){
        state[month] = {};
      }
      if(month==0){
        items[id]=action.bill;
      }else{
        state[month][id]=action.bill
      }
      return {
        ...state,
        items:items,
      }
    }
    case ActionTypes.REMOVEBILLER: {
      let items = state.items,
      month= action.bill['type'] ? 0 : getCurrentBillMonth();
      if(month==0){
        delete(items[action.bill.id]);
      }else{
        delete(state[month][action.bill.id]);
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
export default bills;