import {combineReducers} from 'redux';
import task from './tasks.reducer'
import promotions from './promotions.reducer'
import owntasks from './owntasks.reducer'
import bank from './bank.reducer'
import complaint from './complaint.reducer'
const reducer = combineReducers({
    task,
    promotions,
    owntasks,
    bank,
    complaint
});

export default reducer;