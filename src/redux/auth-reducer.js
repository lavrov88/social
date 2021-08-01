const SET_USER_AUTH = 'SET_USER_AUTH';
const SET_USER_IMG = 'SET_USER_IMG';

const initialState = {
    userId: null,
    login: null,
    email: null,
    isAuthorised: false,
    userImg: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_AUTH:
            return {
                ...state,
                ...action.data
            }
        case SET_USER_IMG: {
            return {
                ...state,
                userId: action.link
            }
        }
        default:
            return state;
    }
}

export const setUserAuth = (userId, email, login, isAuthorised) => ({type: SET_USER_AUTH, data: {userId, email, login, isAuthorised}})
export const setUserImg = (link) => ({type: SET_USER_IMG, data: link})
export default authReducer;