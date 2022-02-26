import { stopSubmit } from "redux-form";
import { authAPI, profileAPI, securityAPI } from "../api/api";

const SET_USER_AUTH = 'social/auth/SET_USER_AUTH'
const SET_USER_IMG = 'social/auth/SET_USER_IMG'
const SET_CAPTCHA_URL = 'social/auth/SET_CAPTCHA_URL'

export type AuthInitialStateType = {
   userId: number | null
   login: string | null
   email: string | null
   isAuthorised: boolean
   userImg: string | null
   captchaUrl: string | null
}

const initialState: AuthInitialStateType = {
    userId: null,
    login: null,
    email: null,
    isAuthorised: false,
    userImg: null,
    captchaUrl: null
};

const authReducer = (state = initialState, action: any): AuthInitialStateType => {
    switch (action.type) {
        case SET_USER_AUTH:
            return {
                ...state,
                ...action.payload,
                captchaUrl: null
            }
        case SET_USER_IMG: {
            return {
                ...state,
                userImg: action.link
            }
        }
        case SET_CAPTCHA_URL: {
           return {
              ...state,
              captchaUrl: action.captchaUrl
           }
        }
        default:
            return state;
    }
}

type SetUserAuthActionType = {
   type: typeof SET_USER_AUTH
   payload: {
      userId: number | null
      email: string | null
      login: string | null
      isAuthorised: boolean
   }
}

export const setUserAuth = (userId: number | null, email: string | null, login: string | null, isAuthorised: boolean): SetUserAuthActionType => ({type: SET_USER_AUTH, payload: {userId, email, login, isAuthorised}})
export const setUserImg = (link: string | null) => ({type: SET_USER_IMG, link: link})
export const setCaptchaUrl = (captchaUrl: string) => ({type: SET_CAPTCHA_URL, captchaUrl: captchaUrl})

export const getUserAuthData = () => async (dispatch: any) => {
   let currentUserId = null
   let data = await authAPI.checkAuth()

   if (data.resultCode === 0) {
      let {id, login, email} = data.data
      currentUserId = id
      dispatch(setUserAuth(id, email, login, true))
   }
   
   if (currentUserId !== null) {
      profileAPI.getProfile(currentUserId)
         .then((data: any) => {
               if (data) {
                  dispatch(setUserImg(data.photos.small))
               } else {
                  dispatch(setUserImg(null))
               }
         })
   } else {
      dispatch(setUserImg(null))
   }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
   let data = await authAPI.login(email, password, rememberMe, captcha)
   if (data.resultCode === 0) {
      dispatch(getUserAuthData());
   } else {
      const message = data.messages.length > 0 ? data.messages[0] : "Common error"
      dispatch(stopSubmit('login', {_error: message}))
      if (data.resultCode === 10) {
         dispatch(getCaptchaUrl())
      }
   }
}

export const logout = () => async (dispatch: any) => {
   let data = await authAPI.logout()
   if (data.resultCode === 0) {
      dispatch(setUserAuth(null, null, null, false))
      dispatch(getUserAuthData())
   }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
   let captchaUrl = await securityAPI.getCaptchaUrl()
      dispatch(setCaptchaUrl(captchaUrl.url))
}

export default authReducer