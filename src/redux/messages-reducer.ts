const SEND_MESSAGE = 'social/messages/SEND-MESSAGE';
const CLEAR_NEW_STATUS = 'social/messages/CLEAR_NEW_STATUS';
const CHANGE_LAST_OPENED_DIALOG = 'social/messages/CHANGE_LAST_OPENED_DIALOG';

type DialogObjectType = {
   id : number
   name: string
}
type MessageObjectType = {
   id : number
   type: string
   text: string
   new: boolean
}

const initialState = {
    dialogs: [
        {id: 1, name: 'Вася'},
        {id: 2, name: 'Петя'},
        {id: 3, name: 'Миша'},
        {id: 4, name: 'Таня'},
    ] as Array<DialogObjectType>,

    messages: [
        {id: 1, type: 'in', text: 'Привет', new: false},
        {id: 2, type: 'in', text: 'Как сам?', new: false},
        {id: 3, type: 'out', text: 'Привет', new: false},
        {id: 4, type: 'out', text: 'Всё нормально', new: false},
        {id: 5, type: 'in', text: 'Ну и отлично!', new: false},
    ] as Array<MessageObjectType>,

    newMessageInput: '',
    lastOpenedDialog: 1
}

type InitialStateType = typeof initialState

const messageReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = {
                id: state.messages[state.messages.length - 1].id + 1,
                type: 'out',
                text: action.text,
                new: true
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageInput: ''
            }
        }
        case CLEAR_NEW_STATUS: {
            return {
                ...state,
                messages: state.messages.map(m => {
                    if (m.new === true) {
                        return {...m, new: false}
                    }
                    return m;
                })
            }
        }
        case CHANGE_LAST_OPENED_DIALOG: {
           return {
              ...state,
              lastOpenedDialog: action.payload
           }
        }
        default:
            return state;
    }
}

type SendMessageActionType = {
   type: typeof SEND_MESSAGE
   text: string
}
type ClearNewStatusActionType = {
   type: typeof CLEAR_NEW_STATUS
}
type ChangeLastOpenedDialogType ={
   type: typeof CHANGE_LAST_OPENED_DIALOG
   payload: number
}

export const sendMessageActionCreator = (text: string): SendMessageActionType => ({type: SEND_MESSAGE, text: text});
export const clearNewStatusActionCreator = (): ClearNewStatusActionType => ({type: CLEAR_NEW_STATUS})
export const changeLastOpenedDialog = (dialog: number): ChangeLastOpenedDialogType => ({type: CHANGE_LAST_OPENED_DIALOG, payload: dialog})
export default messageReducer;