import { getUserAuthData} from './auth-reducer';

const SET_APP_INITIALIZE = 'social/app/SET_APP_INITIALIZE';


const initialState = {
   initialized: false
}

type InitialStateType = typeof initialState

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