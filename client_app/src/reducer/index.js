import { combineReducers } from 'redux';
import changeContactReduct from './changeContactReduct';
import addGroupReduct from './addGroupReduct';

const rootReducer = combineReducers({
    changeContactReduct, addGroupReduct
});
export default rootReducer;
