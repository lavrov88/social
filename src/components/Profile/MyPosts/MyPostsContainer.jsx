import React from 'react';
import MyPosts from './MyPosts';
import { addPostActionCreator, 
    updateNewPostTextActionCreator, 
    updateNewPostTitleActionCreator } from '../../../redux/profile-reducer';
import { connect } from 'react-redux';

// const oldMyPostsContainer = (props) => {

//     const store = props.store;

//     const onTitleChange = (text) =>{
//         const action = updateNewPostTitleActionCreator(text);
//         store.dispatch(action);
//     }

//     const onPostChange = (text) =>{
//         const action = updateNewPostTextActionCreator(text);
//         store.dispatch(action);
//     }

//     const addPost = () => {
//         const action = addPostActionCreator();
//         store.dispatch(action);
//     }


//     return (
//         <MyPosts 
//             posts={store.getState().profilePage.posts} 
//             newPostTitleInput={store.getState().profilePage.newPost.newPostTitleInput}
//             newPostTextInput={store.getState().profilePage.newPost.newPostTextInput}
//             onTitleChange={onTitleChange}
//             onPostChange={onPostChange}
//             onAddPost={addPost} />
//     )
// }

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostTitleInput: state.profilePage.newPost.newPostTitleInput,
        newPostTextInput: state.profilePage.newPost.newPostTextInput
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTitleChange: (text) => {
            const action = updateNewPostTitleActionCreator(text);
            dispatch(action);
        },
        onPostChange: (text) => {
            const action = updateNewPostTextActionCreator(text);
            dispatch(action);
        },
        onAddPost: () => {
            const action = addPostActionCreator();
            dispatch(action);
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;