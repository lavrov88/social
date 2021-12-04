import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import NewPost from './NewPostForm/NewPostForm';

const MyPosts = (props) => {
    let sortById = (a, b) => {
        if (a.id > b.id) return -1;
        if (a.id === b.id) return 0;
        if (a.id < b.id) return 1;
    }

    let postsElements = props.posts.sort(sortById)
        .map(p => <Post key={p.id} date={p.date} title={p.title} text={p.text} likes={p.likesCount}/>);

    return (
        <div className={s.my_posts_section}>
            <span className={s.my_posts_title}>My posts</span>
            <NewPost 
               //  newPostTitleInput={props.newPostTitleInput}
               //  newPostTextInput={props.newPostTextInput}
               //  onTitleChange={props.onTitleChange}
               //  onPostChange={props.onPostChange}
                onAddPost={props.onAddPost} />
            <div className={s.posts_list}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;