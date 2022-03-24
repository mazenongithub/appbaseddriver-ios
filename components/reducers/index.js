import { combineReducers } from 'redux';
import myusermodel from './myuserreducer';
import navigation from './navigationreducer'
export default combineReducers({
    myusermodel,
    navigation
})