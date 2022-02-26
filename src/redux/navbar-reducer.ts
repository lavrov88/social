import { usersAPI } from "../api/api";
import { LinkType, NavUserType } from "../types/types";

const TOGGLE_USERS_IS_LOADING = 'social/navbar/TOGGLE_USERS_IS_LOADING'
const SET_LATEST_USERS = 'social/navbar/SET_LATEST_USERS'


const initialState = {
    links: [
        {url: '/profile', name: 'Profile'},
        {url: '/messages', name: 'Messages'},
        {url: '/news', name: 'News', disabled: true},
        {url: '/music', name: 'Music', disabled: true},
        {url: '/users', name: 'Users'},
        {url: '/settings', name: 'Settings', disabled: true},
    ] as Array<LinkType>,

    users: [
        {id: 1, name: 'Загружается'},
        {id: 2, name: 'Список'},
        {id: 3, name: 'Пользователей'},
    ] as Array<NavUserType>,

    isLoading: false
}

type InitialStateType = typeof initialState

const navbarReducer = (state = initialState, action:any): InitialStateType => {
   switch (action.type) {
      case SET_LATEST_USERS:
         return {...state, users: [...action.users]}
      case TOGGLE_USERS_IS_LOADING:
         return {...state, isLoading: action.isLoading}
      default:
         return state;
   }
}

type ToggleUsersIsLoadingActionType = {
   type: typeof TOGGLE_USERS_IS_LOADING
   isLoading: boolean
}
export const toggleUsersIsLoading = (isLoading: boolean): ToggleUsersIsLoadingActionType => ({type: TOGGLE_USERS_IS_LOADING, isLoading})
type SetLatestUsersActionType = {
   type: typeof SET_LATEST_USERS
   users: Array<NavUserType>
}
export const setLatestUsers = (users: Array<NavUserType>): SetLatestUsersActionType => ({type: SET_LATEST_USERS, users})

export const refreshLatestUsers = () => {
   return async (dispatch: any) => {
      dispatch(toggleUsersIsLoading(true))
      let data
      try {
         data = await usersAPI.getUsers(1, 3)
      }
      catch(e) {
         console.log(e)
         data = {items: [{id: 1, name: 'no data'}, {id: 2, name: 'no data'}, {id: 3, name: 'no data'},]}
      }
      dispatch(setLatestUsers(data.items))
      dispatch(toggleUsersIsLoading(false))
   }
}

export default navbarReducer;