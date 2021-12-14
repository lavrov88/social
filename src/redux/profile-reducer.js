import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'social/profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'social/profile/SET_USER_STATUS';

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
        default:
            return state;
    }
}

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
export const addPostActionCreator = (data) => ({type: ADD_POST, title: data.newPostTitle, text: data.newPostText});

export const getUserProfile = (userId) => async (dispatch) => {
   let data = await profileAPI.getProfile(userId)
   dispatch(setUserProfile(data))
}

export const getUserStatus = (userId) => async (dispatch) => {
   let response = await profileAPI.getStatus(userId)
   dispatch(setUserStatus(response))
}

export const updateUserStatus = (status) => async (dispatch) => {
   let response = await profileAPI.updateStatus(status)
   if (response.resultCode === 0)
   dispatch(setUserStatus(status))
}

export default profileReducer;