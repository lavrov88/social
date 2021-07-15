import React from 'react';
import { sendMessageActionCreator, updateMessageInputActionCreator } from '../../redux/messages-reducer';
import Messages from './Messages';
import {connect} from 'react-redux';

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