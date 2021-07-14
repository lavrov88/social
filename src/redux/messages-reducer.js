const UPDATE_MESSAGE_INPUT = 'UPDATE-MESSAGE-INPUT';
const SEND_MESSAGE = 'SEND-MESSAGE';

const initialState = {
    dialogs: [
        {id: 1, name: 'Вася'},
        {id: 2, name: 'Петя'},
        {id: 3, name: 'Джибраил'},
        {id: 4, name: 'Таня'},
        {id: 5, name: 'Миша'},
    ],

    messages: [
        {id: 1, type: 'in', text: 'Привет'},
        {id: 2, type: 'in', text: 'Как сам?'},
        {id: 3, type: 'out', text: 'Привет'},
        {id: 4, type: 'out', text: 'Да нормально'},
        {id: 5, type: 'in', text: 'Ништяк'},
    ],

    newMessageInput: ''
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_MESSAGE_INPUT: {
            return {
                ...state,
                newMessageInput: action.text
            }
        }
        case SEND_MESSAGE: {
            let newMessage = {
                id: state.messages[state.messages.length - 1].id + 1,
                type: 'out',
                text: state.newMessageInput
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageInput: ''
            }
        }
        default:
            return state;
    }
}

export const updateMessageInputActionCreator = (text) => ({type: UPDATE_MESSAGE_INPUT, text: text});
export const sendMessageActionCreator = () => ({type: SEND_MESSAGE});
export default messageReducer;