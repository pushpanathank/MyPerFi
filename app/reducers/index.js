// Imports: Reducers
import auth from './auth';
import common from './common';
import settings from './settings';
import { reducer as formReducer } from 'redux-form';

// Redux: Root Reducer
const rootReducer = {
  auth: auth,
  common: common,
  settings: settings,
  form: formReducer
};

// Exports
export default rootReducer;