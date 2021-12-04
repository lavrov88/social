const UPDATE_MESSAGE_INPUT = 'UPDATE-MESSAGE-INPUT';
const SEND_MESSAGE = 'SEND-MESSAGE';
const CLEAR_NEW_STATUS = 'CLEAR_NEW_STATUS';

const initialState = {
    dialogs: [
        {id: 1, name: 'Вася'},
        {id: 2, name: 'Петя'},
        {id: 3, name: 'Джибраил'},
        {id: 4, name: 'Таня'},
        {id: 5, name: 'Миша'},
    ],

    messages: [
        {id: 1, type: 'in', text: 'Привет', new: false},
        {id: 2, type: 'in', text: 'Как сам?', new: false},
        {id: 3, type: 'out', text: 'Привет', new: false},
        {id: 4, type: 'out', text: 'Да нормально', new: false},
        {id: 5, type: 'in', text: 'Ништяк', new: false},
    ],

    newMessageInput: ''
};

const messageReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
}

export const sendMessageActionCreator = (text) => ({type: SEND_MESSAGE, text: text});
export const clearNewStatusActionCreator = () => ({type: CLEAR_NEW_STATUS})
export default messageReducer;