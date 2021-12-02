import chartReducer from './chartReducer';
import { combineReducers } from 'redux';
const reducers = combineReducers({
  chart: chartReducer,
});
export default reducers;
