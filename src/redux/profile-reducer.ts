import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
import { PhotosType, ProfileType } from "../types/types";

const ADD_POST = 'social/profile/ADD-POST'
const TOGGLE_PROFILE_IS_LOADING = 'social/profile/TOGGLE_PROFILE_IS_LOADING'
const SET_USER_PROFILE = 'social/profile/SET_USER_PROFILE'
const SET_USER_STATUS = 'social/profile/SET_USER_STATUS'
const SAVE_PHOTO_SUCCESS = 'social/profile/SAVE_PHOTO_SUCCESS'

type NewPostType = {
   newPostTitleInput: string
   newPostTextInput: string
}
type PostType = {
   id: number
   date: string
   title: string
   text: string
   likesCount: number
}

const initialState = {
   profile: null as ProfileType | null,
   status: '...',

   newPost: {
      newPostTitleInput: '',
      newPostTextInput: ''
   } as NewPostType,

   posts: [
      {id: 1, date: '01.07.2021', title: 'First post', text: 'This IS text of first post', likesCount: 15},
      {id: 2, date: '04.07.2021', title: 'Hey', text: 'How are you?', likesCount: 9},
      {id: 3, date: '06.07.2021', title: 'Hello', text: 'Hey hey hello!', likesCount: 10}
   ] as Array<PostType>,

   isLoading: false
}

type InitialStateType = typeof initialState

const profileReducer = (state: InitialStateType = initialState, action: any) => {
    switch (action.type) {
        case ADD_POST: {
            let addZero = (num: number): string => {
                if (+num < 10) {
                    return `0${num}`;
                } else {
                    return `${num}`;
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

type UserProfileActionType = {
   type: typeof SET_USER_PROFILE
   profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): UserProfileActionType => ({type: SET_USER_PROFILE, profile})
type UserStatusActionType = {
   type: typeof SET_USER_STATUS
   status: string
}
export const setUserStatus = (status: string): UserStatusActionType => ({type: SET_USER_STATUS, status})
type ProfileIsLoadingActionType = {
   type: typeof TOGGLE_PROFILE_IS_LOADING,
   isLoading: boolean
}
export const toggleProfileIsLoading = (isLoading: boolean): ProfileIsLoadingActionType => ({type: TOGGLE_PROFILE_IS_LOADING, isLoading})
type AddPostActionType = {
   type: typeof ADD_POST
   title: string
   text: string
}
type PostDataObjectType = {
   newPostTitle: string
   newPostText: string
}
export const addPostActionCreator = (data: PostDataObjectType): AddPostActionType => ({type: ADD_POST, title: data.newPostTitle, text: data.newPostText})
type SavePhotoSuccessActionType = {
   type: typeof SAVE_PHOTO_SUCCESS
   photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

export const getUserProfile = (userId: number) => async (dispatch: any) => {
   dispatch(toggleProfileIsLoading(true))
   let data = await profileAPI.getProfile(userId)
   dispatch(setUserProfile(data))
   dispatch(toggleProfileIsLoading(false))
}

export const getUserStatus = (userId: number) => async (dispatch: any) => {
   let response = await profileAPI.getStatus(userId)
   dispatch(setUserStatus(response))
}

export const updateUserStatus = (status: string) => async (dispatch: any) => {
   let response = await profileAPI.updateStatus(status)
   if (response.resultCode === 0) {
      dispatch(setUserStatus(status))
   }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
   let response = await profileAPI.savePhoto(file)
   if (response.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.photos))
   }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
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