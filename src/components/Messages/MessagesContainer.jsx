import React from 'react';
import { clearNewStatusActionCreator, sendMessageActionCreator, updateMessageInputActionCreator } from '../../redux/messages-reducer';
import Messages from './Messages';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

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
        onMessageSend: (messageInputItem) => {
            dispatch(sendMessageActionCreator());
            setTimeout(() => {
                dispatch(clearNewStatusActionCreator());
            }, 500);
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)
(Messages);