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
                ...action.data
            }
        case SET_USER_IMG: {
            return {
                ...state,
                userId: action.link
            }
        }
        default:
            return state;
    }
}

export const setUserAuth = (userId, email, login, isAuthorised) => ({type: SET_USER_AUTH, data: {userId, email, login, isAuthorised}})
export const setUserImg = (link) => ({type: SET_USER_IMG, data: link})

export const getUserAuthData = () => (dispatch) => {
    let currentUserId = null;
    authAPI.checkAuth()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data;
                    let isAuthorised = true;
                    currentUserId = data.data.id;
                    dispatch(setUserAuth(id, email, login, isAuthorised));
                }

                if (currentUserId !== null) {
                    profileAPI.getProfile(currentUserId)
                        .then(data => {
                            dispatch(setUserImg(data.photos.small));
                        });
                }
            });
}

export default authReducer;