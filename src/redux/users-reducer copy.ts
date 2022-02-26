import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { AppStateType } from "./redux-store";

const FOLLOW = 'social/users/FOLLOW';
const UNFOLLOW = 'social/users/UNFOLLOW';
const SET_USERS= 'social/users/SET_USERS';
const SET_TOTAL_USERS_COUNT = 'social/users/SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE= 'social/users/SET_CURRENT_PAGE';
const TOGGLE_IS_LOADING= 'social/users/TOGGLE_IS_LOADING';
const TOGGLE_FOLLOWING_PROGRESS= 'social/users/TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    followingInProgress: [] as Array<number>
}
type InitialStateType = typeof initialState

const followUnfollowReducer = (state: InitialStateType, userId: number, followStatus: boolean): InitialStateType => {
   return {
      ...state,
      users: state.users.map(u => {
          if (u.id === userId) {
              return {...u, followed: followStatus}
          }
          return u;
      })
  }
}

type ActionsTypes = FollowSuccesActionType | UnfollowSuccesActionType | SetTotalUsersCountActionType | 
                    SetUsersActionType | SetCurrentPageActionType | ToggleIsLoadingActionType | 
                    ToggleFollowingProgressActionType

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return followUnfollowReducer(state, action.userId, true)
        case UNFOLLOW:
            return followUnfollowReducer(state, action.userId, false)
        case SET_USERS:
            return {...state, users: [...action.users]}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case TOGGLE_IS_LOADING:
            return {...state, isLoading: action.isLoading}
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state, 
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter (id => id !== action.userId)
            }
        default:
            return state;
    }
}

type FollowSuccesActionType = {
   type: typeof FOLLOW
   userId: number
}
export const followSucces = (userId: number): FollowSuccesActionType => ({type: FOLLOW, userId})
type UnfollowSuccesActionType = {
   type: typeof UNFOLLOW
   userId: number
}
export const unfollowSucces = (userId: number): UnfollowSuccesActionType => ({type: UNFOLLOW, userId})
type SetTotalUsersCountActionType = {
   type: typeof SET_TOTAL_USERS_COUNT
   count: number
}
export const setTotalUsersCount = (count: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, count})
type SetUsersActionType = {
   type: typeof SET_USERS
   users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})
type SetCurrentPageActionType = {
   type: typeof SET_CURRENT_PAGE
   currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})
type ToggleIsLoadingActionType = {
   type: typeof TOGGLE_IS_LOADING
   isLoading: boolean
}
export const toggleIsLoading = (isLoading: boolean): ToggleIsLoadingActionType => ({type: TOGGLE_IS_LOADING, isLoading})
type ToggleFollowingProgressActionType = {
   type: typeof TOGGLE_FOLLOWING_PROGRESS
   followingInProgress: boolean
   userId: number
}
export const toggleFollowingProgress = (followingInProgress: boolean, userId: number): ToggleFollowingProgressActionType => ({type: TOGGLE_FOLLOWING_PROGRESS, followingInProgress, userId})

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => {
   return async (dispatch) => {
      dispatch(toggleIsLoading(true))
      let data = await usersAPI.getUsers(currentPage, pageSize)
      dispatch(setUsers(data.items))
      dispatch(setTotalUsersCount(data.totalCount))
      dispatch(toggleIsLoading(false))
   }
}

const followUnfollowThunk = async (follow: boolean, dispatch: DispatchType, userId: number) => {
   dispatch(toggleFollowingProgress(true, userId))
   let data
   follow === true
      ? data = await usersAPI.followUser(userId)
      : data = await usersAPI.unfollowUser(userId)
   
   if (data.resultCode === 0) {
      follow === true
      ? dispatch(followSucces(userId))
      : dispatch(unfollowSucces(userId))
   }
   dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
   return async (dispatch) => {
      followUnfollowThunk(true, dispatch, userId)
   }
}

export const unfollow = (userId: number): ThunkType => {
   return async (dispatch) => {
      followUnfollowThunk(false, dispatch, userId)
   }
}

export default usersReducer;