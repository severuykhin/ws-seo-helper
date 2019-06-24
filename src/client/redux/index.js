import { combineReducers } from 'redux'

import reportsReducer from './reducers/reports'
import { moduleName as reportsModule } from './actions/reports'

export default combineReducers({
  [reportsModule] : reportsReducer
});
