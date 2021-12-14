import { getUserAuthData} from './auth-reducer.js';

const SET_APP_INITIALIZE = 'social/app/SET_APP_INITIALIZE';

const initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APP_INITIALIZE:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const initializeSucceded = () => ({type: SET_APP_INITIALIZE})

export const initializeApp = () => (dispatch) => {
   let promise = dispatch(getUserAuthData())
   Promise.all([promise])
      .then(() => {
         dispatch(initializeSucceded())
      })
}

export default appReducer;