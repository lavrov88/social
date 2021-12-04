// USERS

export const getUsers = (state) => {
   return state.usersPage.users
}

export const getPageSize = (state) => {
   return state.usersPage.pageSize
}

export const getTotalUsersCount = (state) => {
   return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state) => {
   return state.usersPage.currentPage
}

export const getIsLoadingStatus = (state) => {
   return state.usersPage.isLoading
}

export const getFollowingInProgressStatus = (state) => {
   return state.usersPage.followingInProgress
}


// {
//    users: state.usersPage.users,
//    pageSize: state.usersPage.pageSize,
//    totalUsersCount: state.usersPage.totalUsersCount,
//    currentPage: state.usersPage.currentPage,
//    isLoading: state.usersPage.isLoading,
//    followingInProgress: state.usersPage.followingInProgress,
// }