import { profileAPI } from "../api/api";

const UPDATE_NEW_POST_TITLE = 'UPDATE-NEW-POST-TITLE';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

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
        case UPDATE_NEW_POST_TITLE:{
            return {
                ...state,
                newPost: {
                    ...state.newPost,
                    newPostTitleInput: action.text,
                }
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPost: {
                    ...state.newPost,
                    newPostTextInput: action.text,
                }
            }
        }
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
                title: state.newPost.newPostTitleInput,
                text: state.newPost.newPostTextInput,
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
export const updateNewPostTitleActionCreator = (text) => ({type: UPDATE_NEW_POST_TITLE, text: text});
export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, text: text});
export const addPostActionCreator = () => ({type: ADD_POST});

export const getUserProfile = (userId) => (dispatch) => {
    profileAPI.getProfile(userId)
        .then(data => {
            dispatch(setUserProfile(data));
        })
}

export const getUserStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setUserStatus(response));
        })
}

export const updateUserStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.resultCode === 0)
            dispatch(setUserStatus(status));
        })
}

export default profileReducer;