// Imports: Reducers
import auth from './auth';
import common from './common';
import settings from './settings';
import accounts from './accounts';
import transactions from './transactions';
import bills from './bills';
// import { reducer as formReducer } from 'redux-form';

// Redux: Root Reducer
const rootReducer = {
  auth: auth,
  common: common,
  // form: formReducer,
  settings: settings,
  accounts: accounts,
  transactions: transactions,
  bills: bills,
};

// Exports
export default rootReducer;