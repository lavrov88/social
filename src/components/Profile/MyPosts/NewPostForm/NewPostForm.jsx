import React from 'react';
import s from './NewPostForm.module.css';

const NewPostForm = (props) => {

    let newPostElement = React.createRef();
    let newPostTitleElement = React.createRef();

    let onTitleChange = () => {
        let text = newPostTitleElement.current.value;
        props.onTitleChange(text);
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.onPostChange(text);
    }

    let onAddPost = () => {
        props.onAddPost();
    }

    return (
        <div className={s.post_add_form}>
            <input
                onChange={onTitleChange}
                ref={newPostTitleElement}
                placeholder="New post's title"
                value={props.newPostTitleInput} />
            <textarea
                onChange={onPostChange}
                ref={newPostElement}
                placeholder="Post's text"
                value={props.newPostTextInput} />
            <button onClick={onAddPost}>Send post</button>
        </div>
    )
}

export default NewPostForm;