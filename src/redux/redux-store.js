import { applyMiddleware, combineReducers, createStore } from "redux";
import authReducer from "./auth-reducer";
import messageReducer from "./messages-reducer";
import navbarReducer from "./navbar-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from "redux-form";

let reducers = combineReducers({
    auth: authReducer,
    profilePage: profileReducer,
    messagesPage: messageReducer,
    usersPage: usersReducer,
    navbar: navbarReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;