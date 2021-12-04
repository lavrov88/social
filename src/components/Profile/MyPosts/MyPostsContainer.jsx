import React from 'react';
import MyPosts from './MyPosts';
import { addPostActionCreator, 
   //  updateNewPostTextActionCreator, 
   //  updateNewPostTitleActionCreator 
   } from '../../../redux/profile-reducer';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostTitleInput: state.profilePage.newPost.newPostTitleInput,
        newPostTextInput: state.profilePage.newPost.newPostTextInput
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      //   onTitleChange: (text) => {
      //       const action = updateNewPostTitleActionCreator(text);
      //       dispatch(action);
      //   },
      //   onPostChange: (text) => {
      //       const action = updateNewPostTextActionCreator(text);
      //       dispatch(action);
      //   },
        onAddPost: (data) => {
            const action = addPostActionCreator(data);
            dispatch(action);
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;