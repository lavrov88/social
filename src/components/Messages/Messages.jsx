import React from 'react';
import s from './Messages.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
    let path = '/messages/' + props.id;

    return (
        <div className={s.dialog_item}>
            <NavLink
                to={path}
                activeClassName={s.active}>
                {props.name}
            </NavLink>
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

    let dialogsItems = props.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} />);
    let messagesItems = props.messages.map(m => <MessageItem key={m.key} type={classForType(m.type)} text={m.text} new={m.new} />);
    let messageInputItem = React.createRef();

    let onMessageTextChange = () => {
        let text = messageInputItem.current.value;
        props.onMessageTextChange(text);
    }

    let onMessageKeyPress = (e) => {
        if (e.key === 'Enter') {            
            setTimeout(() => {
                props.onMessageSend(); //adds line break without timeout
            }, 20);
        }
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
                    <div className={s.send_message}>
                        <textarea 
                            onChange={onMessageTextChange}
                            onKeyPress={(e) => {onMessageKeyPress(e)}}
                            ref={messageInputItem}
                            value={props.newMessageInput}
                        />
                        <button onClick={props.onMessageSend}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages;