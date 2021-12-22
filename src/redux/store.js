import reducer from "./reducers/index";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk];

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
