import { combineReducers, createStore } from "redux";

import accountReducer from "./features/account/accountSlice";

const rootReducer = combineReducers({
  account: accountReducer,
});

const store = createStore(rootReducer);

export default store;
