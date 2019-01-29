import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { shipments } from './shipments.reducer';
import { bikers } from './bikers.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  shipments,
  bikers,
  users,
  alert
});

export default rootReducer;