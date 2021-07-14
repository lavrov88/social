import { combineReducers, createStore } from "redux";
import messageReducer from "./messages-reducer";
import navbarReducer from "./navbar-reducer";
import profileReducer from "./profile-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messageReducer,
    navbar: navbarReducer
});

let store = createStore(reducers);
window.store = store;

export default store;