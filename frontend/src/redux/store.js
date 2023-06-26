import { legacy_createStore , combineReducers , applyMiddleware } from "redux";
import {reducer as authReducer} from "./authReducer/reducer";
import {reducer as appReducer} from "./appReducer/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({authReducer, appReducer})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));