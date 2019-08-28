// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';

// Reducers (Modifies The State And Returns A New State)
const auth = (state = initialState.settings, action) => {
  switch (action.type) {
    case ActionTypes.LANGUAGECODE: {
      return {
        ...state,
        language: action.language,
        languageId: action.languageId,
        languageSet: action.languageSet,
      }
    }
    
    case ActionTypes.SETCURRENCY: {
      return {
        ...state,
        currency: action.currency,
        currSymbol: action.currSymbol,
      }
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default auth;