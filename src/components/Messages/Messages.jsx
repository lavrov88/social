import React from 'react';
import s from './Messages.module.css';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../Common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const DialogItem = (props) => {
    let path = '/messages/' + props.id;
    const onDialogClicked = () => {
      props.onDialogClicked(props.id)
    }

    return (
        <div className={s.dialog_item}>
            <Link
                to={path}
                onClick={onDialogClicked}
                className={(props.lastOpenedDialog === props.id) ? s.active : undefined}>
                {props.name}
            </Link>
        </div>
    )
}

const MessageItem = (props) => {
    let returnNewClass = (status) => {
        if (status === true) {
            return ` ${s.message_new}`;
        }
        return '';
    }

    return (
        <div className={s.message_item + ' ' + props.type}>
            <div className={s.message_item__text + returnNewClass(props.new)}>
                {props.text}
            </div>
        </div>
    )
}

const maxLength100 = maxLengthCreator(100)

const NewMessageForm = (props) => {
   return (
      <div className={s.send_message}>
         <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="messageText"
               validate={[required, maxLength100]} placeholder="Message's text" />
            <button type="submit" onClick={() => setTimeout(() => {
               if (props.valid) {
                  props.reset()
               }
            }, 10)}>Send</button>
         </form>
      </div>
   )
}

const NewMessageReduxForm = reduxForm({form: 'newMessage'})(NewMessageForm)

const Messages = (props) => {

    let classForType = (type) => {
        if (type === 'in') {
            return '';
        } else if (type === 'out') {
            return s.out
        } else {
            return `incorrect message type: ${type}`
        }
    };

    let dialogsItems = props.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} lastOpenedDialog={props.lastOpenedDialog} onDialogClicked={props.onDialogClicked} />);
    let messagesItems = props.messages.map(m => <MessageItem key={m.id} type={classForType(m.type)} text={m.text} new={m.new} />);

    const onMessageSend = (formData) => {
       props.onMessageSend(formData)
    }

    return (
        <div className={s.content}>
            <div className={s.messages}>
                <div className={s.dialogs_list}>
                    {dialogsItems}
                </div>
                <div className={s.dialog}>
                    <div className={s.messages_list}>
                        {messagesItems}
                    </div>
                    <NewMessageReduxForm onSubmit={onMessageSend} />
                </div>
            </div>
        </div>
    )
}

export default Messages;