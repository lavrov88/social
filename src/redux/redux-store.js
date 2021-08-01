import { combineReducers, createStore } from "redux";
import authReducer from "./auth-reducer";
import messageReducer from "./messages-reducer";
import navbarReducer from "./navbar-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({
    auth: authReducer,
    profilePage: profileReducer,
    messagesPage: messageReducer,
    usersPage: usersReducer,
    navbar: navbarReducer
});

let store = createStore(reducers);
window.store = store;

export default store;