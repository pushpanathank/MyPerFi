// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';
import { generateUUID } from '../utils/common';

// Reducers (Modifies The State And Returns A New State)
const bills = (state = initialState.bills, action) => {
  switch (action.type) {
    case ActionTypes.RESETBILLS: {
      return {...initialState.bills};
    }

    case ActionTypes.ADDBILLER: {
      let items = state.items,
      id= generateUUID();
      if(action.bill['id']){
        id = action.bill['id'];
      }
      action.bill['id']=id;
      items[id]=action.bill;
      return {
        ...state,
        items:items,
      }
    }
    case ActionTypes.REMOVEBILLER: {
      let items = state.items;
      delete(items[action.id]);
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