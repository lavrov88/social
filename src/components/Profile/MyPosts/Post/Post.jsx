import React from 'react';
import s from './Post.module.css';
import userProfileImage from '../../../../assets/images/user.png';

const Post = (props) => {
    const checkEmptyTitle = (title) => {
        if (title === '') { 
            return '(no title)';
        } else {
            return title;
        }
    }

    return (
        <div className={s.post_item}>
            <div className={s.post_left}>
                <img src={userProfileImage} alt="" />
                <div>{props.date}</div>
            </div>
            <div className={s.post_right}>
                <div className={s.post_title}>{checkEmptyTitle(props.title)}</div>
                <div className={s.post_text}>{props.text}</div>
                <div className={s.post_likes}>
                    Likes: <span className={s.likes_counter}>{props.likes}</span>
                </div>
            </div>
        </div>
    )
}

export default Post;