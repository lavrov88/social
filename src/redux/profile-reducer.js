import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

const ADD_POST = 'social/profile/ADD-POST';
const TOGGLE_PROFILE_IS_LOADING = 'social/profile/TOGGLE_PROFILE_IS_LOADING';
const SET_USER_PROFILE = 'social/profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'social/profile/SET_USER_STATUS';
const SAVE_PHOTO_SUCCESS = 'social/profile/SAVE_PHOTO_SUCCESS';

const initialState = {

    profile: null,
    status: '...',

    newPost: {
        newPostTitleInput: '',
        newPostTextInput: ''
    },

    posts: [
        {id: 1, date: '01.07.2021', title: 'First post', text: 'This IS text of first post', likesCount: 15},
        {id: 2, date: '04.07.2021', title: 'Hey', text: 'How are you?', likesCount: 9},
        {id: 3, date: '06.07.2021', title: 'Hello', text: 'Hey hey hello!', likesCount: 10}
    ],

    isLoading: false
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let addZero = (num) => {
                if (+num < 10) {
                    return `0${num}`;
                } else {
                    return num;
                }
            }
            let nowDate = new Date();
            let newPost = {
                id: state.posts[0].id + 1,
                date: `${addZero(nowDate.getDate())}.${addZero(nowDate.getMonth() + 1)}.${nowDate.getFullYear()}`,
                title: action.title,
                text: action.text,
                likesCount: 0
            }
            return {
                ...state,
                posts: [newPost, ...state.posts],
                newPost: {
                    newPostTitleInput: '',
                    newPostTextInput: ''
                }
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_USER_STATUS: {
            return {...state, status: action.status}
        }
        case TOGGLE_PROFILE_IS_LOADING: {
            return {...state, isLoading: action.isLoading}
        }
        case SAVE_PHOTO_SUCCESS: {
         return {...state, profile: {...state.profile, photos: action.photos}}
     }
        default:
            return state;
    }
}

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
export const toggleProfileIsLoading = (isLoading) => ({type: TOGGLE_PROFILE_IS_LOADING, isLoading})
export const addPostActionCreator = (data) => ({type: ADD_POST, title: data.newPostTitle, text: data.newPostText});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

export const getUserProfile = (userId) => async (dispatch) => {
   dispatch(toggleProfileIsLoading(true))
   let data = await profileAPI.getProfile(userId)
   dispatch(setUserProfile(data))
   dispatch(toggleProfileIsLoading(false))
}

export const getUserStatus = (userId) => async (dispatch) => {
   let response = await profileAPI.getStatus(userId)
   dispatch(setUserStatus(response))
}

export const updateUserStatus = (status) => async (dispatch) => {
   let response = await profileAPI.updateStatus(status)
   if (response.resultCode === 0) {
      dispatch(setUserStatus(status))
   }
}

export const savePhoto = (file) => async (dispatch) => {
   let response = await profileAPI.savePhoto(file)
   if (response.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.photos))
   }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
   const userId = getState().auth.userId
   const response = await profileAPI.saveProfile(profile)
   if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId))
   } else {
      dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
      return Promise.reject(response.data.messages[0])
   }
}

export default profileReducer;