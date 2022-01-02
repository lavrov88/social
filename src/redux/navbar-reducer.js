import { usersAPI } from "../api/api";

const TOGGLE_USERS_IS_LOADING = 'social/navbar/TOGGLE_USERS_IS_LOADING'
const SET_LATEST_USERS = 'social/navbar/SET_LATEST_USERS'

const initialState = {
    links: [
        {url: '/profile', name: 'Profile'},
        {url: '/messages', name: 'Messages'},
        {url: '/news', name: 'News'},
        {url: '/music', name: 'Music'},
        {url: '/users', name: 'Users'},
        {url: '/settings', name: 'Settings'},
    ],

    users: [
        {id: 1, name: 'Вася'},
        {id: 2, name: 'Петя'},
        {id: 3, name: 'Что за нах'},
    ],

    isLoading: false
};

const navbarReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_LATEST_USERS:
         return {...state, users: [...action.users]}
      case TOGGLE_USERS_IS_LOADING:
         return {...state, isLoading: action.isLoading}
      default:
         return state;
   }
}

export const toggleUsersIsLoading = (isLoading) => ({type: TOGGLE_USERS_IS_LOADING, isLoading})
export const setLatestUsers = (users) => ({type: SET_LATEST_USERS, users})

export const refreshLatestUsers = () => {
   return async (dispatch) => {
      dispatch(toggleUsersIsLoading(true));
      let data = await usersAPI.getUsers(1, 3)
      dispatch(setLatestUsers(data.items))
      dispatch(toggleUsersIsLoading(false))
   }
}

export default navbarReducer;