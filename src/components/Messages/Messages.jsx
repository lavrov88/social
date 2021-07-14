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
    return (
        <div className={s.message_item + ' ' + props.type}>
            <div className={s.message_item__text}>
                {props.text}
            </div>
        </div>
    )
}

const Messages = (props) => {

    let classForType = (type) => {
        if (type === 'in') {
            return s.in;
        } else if (type === 'out') {
            return s.out
        }
    };

    let dialogsItems = props.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} />);
    let messagesItems = props.messages.map(m => <MessageItem key={m.key} type={classForType(m.type)} text={m.text} />);

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