import {combineReducers} from 'redux';
import task from './tasks.reducer'

const reducer = combineReducers({
    task,
});

export default reducer;