// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';
import { generateUUID, mergeObj } from '../utils/common';
import { formatDate, getCurrentBillMonth } from '../utils/accounts';

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
    case ActionTypes.RESTOREBILLS: {
      let data = {...action.data},
      items = state.items,
      newitems = data.items;

      for(let b in newitems){
        items[b]=newitems[b];
      }
      delete(data.items);

      for(let d in data){
        if(!state.hasOwnProperty(d)){
          state[d] = {};
        }
        for(let b in data[d]){
          state[d][b]=data[d][b];
        }
      }
      return {...state}
    }

    case ActionTypes.GENERATEBILLS: {
      let items = {...state.items},
      month= getCurrentBillMonth(),
      id= generateUUID(), item={};
      if(!state.hasOwnProperty(month)){
        state[month] = {};
      }
      for(let b in items){
        item = items[b];
        id= generateUUID();
        date = formatDate({format:'yearMonth'})+' '+formatDate({date:item.date, format:'dateShort'});
        item.date = date.replace(/ /g, "-");
        item.curr = 0;
        item.trans = [];
        item.id = id;
        state[month][id]=item;
      }
      
      return {
        ...state
      }
    }

    case ActionTypes.PAIDWITHBILLER: {
      let items = {...state.items},
      month= getCurrentBillMonth(),
      bill= action.bill,
      transaction= action.transaction;

      if(!bill.hasOwnProperty('trans')) bill['trans'] = [];
      bill.trans.push(transaction.id);
      if(parseInt(transaction.amount) >= parseInt(bill.amount)){
        bill.paid = true;
        bill.partPaid = false;
      }else{
        bill.partPaid = true;
      }
      state[month][bill.id]=bill;
      
      return {
        ...state
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