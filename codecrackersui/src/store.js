import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./State/Authentication/Reducer";

const rooteReducer = combineReducers({
    auth: authReducer
});
const store = legacy_createStore(rooteReducer, applyMiddleware(thunk));

export default store;