import {combineReducers} from 'redux';
import courses from './courses.reducer';
import contents from './contents.reducer';

const reducer = combineReducers({
    courses,
    contents
});

export default reducer;