// USERS

import { AppStateType } from "./redux-store"

export const getUsers = (state: AppStateType) => {
   return state.usersPage.users
}

export const getAuthorised = (state: AppStateType) => {
   return state.auth.isAuthorised
}

export const getPageSize = (state: AppStateType) => {
   return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
   return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
   return state.usersPage.currentPage
}

export const getIsLoadingStatus = (state: AppStateType) => {
   return state.usersPage.isLoading
}

export const getFollowingInProgressStatus = (state: AppStateType) => {
   return state.usersPage.followingInProgress
}