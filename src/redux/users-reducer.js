import { usersAPI } from "../api/api";

const FOLLOW = 'social/users/FOLLOW';
const UNFOLLOW = 'social/users/UNFOLLOW';
const SET_USERS= 'social/users/SET_USERS';
const SET_TOTAL_USERS_COUNT = 'social/users/SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE= 'social/users/SET_CURRENT_PAGE';
const TOGGLE_IS_LOADING= 'social/users/TOGGLE_IS_LOADING';
const TOGGLE_FOLLOWING_PROGRESS= 'social/users/TOGGLE_FOLLOWING_PROGRESS';

const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    followingInProgress: []
};

const followUnfollowReducer = (state, userId, followStatus) => {
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

const usersReducer = (state = initialState, action) => {
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

export const followSucces = (userId) => ({type: FOLLOW, userId})
export const unfollowSucces = (userId) => ({type: UNFOLLOW, userId})
export const setTotalUsersCount = (count) => ({type: SET_TOTAL_USERS_COUNT, count})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const toggleIsLoading = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading})
export const toggleFollowingProgress = (followingInProgress, userId) => ({type: TOGGLE_FOLLOWING_PROGRESS, followingInProgress, userId})

export const requestUsers = (currentPage, pageSize) => {
   return async (dispatch) => {
      dispatch(toggleIsLoading(true));
      let data = await usersAPI.getUsers(currentPage, pageSize)
      dispatch(setUsers(data.items))
      dispatch(setTotalUsersCount(data.totalCount))
      dispatch(toggleIsLoading(false))
   }
}

const followUnfollowThunk = async (follow, dispatch, userId) => {
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

export const follow = (userId) => {
   return async (dispatch) => {
      followUnfollowThunk(true, dispatch, userId)

      // dispatch(toggleFollowingProgress(true, userId));
      // let data = await usersAPI.followUser(userId)
      // if (data.resultCode === 0) {
      //    dispatch(followSucces(userId))
      // }
      // dispatch(toggleFollowingProgress(false, userId))
   }
}

export const unfollow = (userId) => {
   return async (dispatch) => {
      followUnfollowThunk(false, dispatch, userId)

      // dispatch(toggleFollowingProgress(true, userId))
      // let data = await usersAPI.unfollowUser(userId)
      // if (data.resultCode === 0) {
      //    dispatch(unfollowSucces(userId))
      // }
      // dispatch(toggleFollowingProgress(false, userId))
   }
}

export default usersReducer;