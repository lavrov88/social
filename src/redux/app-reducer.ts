import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getUserAuthData} from './auth-reducer';
import { AppStateType } from './redux-store';

const SET_APP_INITIALIZE = 'social/app/SET_APP_INITIALIZE';

type InitialStateType = {
   initialized: boolean
}

const initialState: InitialStateType = {
   initialized: false
}

const appReducer = (state = initialState, action: InitializeSuccededActionType): InitialStateType => {
    switch (action.type) {
        case SET_APP_INITIALIZE:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

type InitializeSuccededActionType = {
   type: typeof SET_APP_INITIALIZE
}

export const initializeSucceded = (): InitializeSuccededActionType => ({type: SET_APP_INITIALIZE})

// type DispatchType = Dispatch<InitializeSuccededActionType>
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, InitializeSuccededActionType>


export const initializeApp = () => (dispatch: any) => {
   let promise = dispatch(getUserAuthData())
   Promise.all([promise])
      .then(() => {
         dispatch(initializeSucceded())
      })
}

export default appReducer