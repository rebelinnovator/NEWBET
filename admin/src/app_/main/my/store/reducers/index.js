import {combineReducers} from 'redux';
import task from './tasks.reducer'
import promotions from './promotions.reducer'
const reducer = combineReducers({
    task,
    promotions
});

export default reducer;