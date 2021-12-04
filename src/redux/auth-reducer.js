import { stopSubmit } from "redux-form";
import { authAPI, profileAPI } from "../api/api";

const SET_USER_AUTH = 'SET_USER_AUTH';
const SET_USER_IMG = 'SET_USER_IMG';

const initialState = {
    userId: null,
    login: null,
    email: null,
    isAuthorised: false,
    userImg: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_AUTH:
            return {
                ...state,
                ...action.payload
            }
        case SET_USER_IMG: {
            return {
                ...state,
                userImg: action.link
            }
        }
        default:
            return state;
    }
}

export const setUserAuth = (userId, email, login, isAuthorised) => ({type: SET_USER_AUTH, payload: {userId, email, login, isAuthorised}})
export const setUserImg = (link) => ({type: SET_USER_IMG, data: link})

export const getUserAuthData = () => (dispatch) => {
    let currentUserId = null;
    return authAPI.checkAuth()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data;
                    currentUserId = id;
                    dispatch(setUserAuth(id, email, login, true));
                }

                if (currentUserId !== null) {
                    profileAPI.getProfile(currentUserId)
                        .then(data => {
                            dispatch(setUserImg(data.photos.small));
                        });
                }
            });
}

export const login = (email, password, rememberMe) => (dispatch) => {
   authAPI.login(email, password, rememberMe)
      .then(data => {
         if (data.resultCode === 0) {
            dispatch(getUserAuthData());
         } else {
            const message = data.messages.length > 0 ? data.messages[0] : "Common error"
            dispatch(stopSubmit('login', {_error: message}))
         }
      });
}

export const logout = () => (dispatch) => {
   authAPI.logout()
      .then(data => {
         if (data.resultCode === 0) {
            dispatch(setUserAuth(null, null, null, false));
         }
      });
}

export default authReducer;