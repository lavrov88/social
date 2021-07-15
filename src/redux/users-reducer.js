const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS= 'SET_USERS';


const initialState = {
    users: [{
            id: 1,
            followed: true,
            avatarUrl: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
            fullName: 'Вася К',
            status: 'На встречу приключениям!!',
            location: {
                country: 'Россия',
                city: 'Москва'
            }
        }, {
            id: 2,
            followed: false,
            avatarUrl: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
            fullName: 'Петя М',
            status: 'На встречу приключениям!!',
            location: {
                country: 'Россия',
                city: 'Бугульма'
            }
        },
        {
            id: 3,
            followed: false,
            avatarUrl: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
            fullName: 'Таня',
            status: 'На встречу приключениям!!',
            location: {
                country: 'Белоруссия',
                city: 'Могилев'
            }
        }, {
            id: 4,
            followed: true,
            avatarUrl: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
            fullName: 'Ваня',
            status: 'На встречу приключениям!!',
            location: {
                country: 'Россия',
                city: 'Хабаровск'
            }
        }
    ]
    };

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state;
    }
}

export const followAC = (userId) => ({type: FOLLOW, userId})
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId})
export const setUsersAC = (users) => ({type: SET_USERS, users})
export default usersReducer;