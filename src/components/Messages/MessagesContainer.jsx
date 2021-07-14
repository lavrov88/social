import React from 'react';
import { sendMessageActionCreator, updateMessageInputActionCreator } from '../../redux/messages-reducer';
import Messages from './Messages';
import {connect} from 'react-redux';

// const oldMessagesContainer = (props) => {

//     const store = props.store;

//     const onMessageTextChange = (text) => {
//         store.dispatch(updateMessageInputActionCreator(text));
//     }

//     const onMessageSend = () => {
//         store.dispatch(sendMessageActionCreator());
//     }

//     return (
//         <Messages
//         dialogs={store.getState().messagesPage.dialogs}
//         messages={store.getState().messagesPage.messages}
//         newMessageInput={store.getState().messagesPage.newMessageInput}
//         onMessageTextChange={onMessageTextChange}
//         onMessageSend={onMessageSend} />
//     )
// }

const mapStateToProps = (state) => {
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages,
        newMessageInput: state.messagesPage.newMessageInput
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMessageTextChange: (text) => {
            dispatch(updateMessageInputActionCreator(text))
        },
        onMessageSend: () => {
            dispatch(sendMessageActionCreator())
        }
    }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

export default MessagesContainer;