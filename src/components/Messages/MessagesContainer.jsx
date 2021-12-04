import React from 'react';
import { clearNewStatusActionCreator, sendMessageActionCreator, updateMessageInputActionCreator } from '../../redux/messages-reducer';
import Messages from './Messages';
import {connect} from 'react-redux';
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
        onMessageSend: (formData) => {
            dispatch(sendMessageActionCreator(formData.messageText));
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