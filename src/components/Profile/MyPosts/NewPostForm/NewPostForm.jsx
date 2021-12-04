import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../../utils/validators/validators';
import { Input, Textarea } from '../../../Common/FormsControls/FormsControls';
import s from './NewPostForm.module.css';

const maxLength10 = maxLengthCreator(10)

const NewPostForm = (props) => {
   return (
      <form onSubmit={props.handleSubmit}>
         <div className={s.newPostInputWrapper}>
            <Field placeholder="New post's title" name="newPostTitle"
            component={Input} validate={[required, maxLength10]} />
         </div>
         <div>
            <Field placeholder="Post's text!" name="newPostText"
            component={Textarea} validate={[required, maxLength10]} />
         </div>
         <div className={s.newPostInputWrapper}>
            <button>Send post</button>
         </div>
      </form>
   )
}

const NewPostReduxForm = reduxForm({form: 'newPost'})(NewPostForm)

const NewPost = (props) => {
    const onSubmit = (formData) => {
      props.onAddPost(formData)
    }

    return (
        <div className={s.post_add_form}>
           <NewPostReduxForm onSubmit={onSubmit} />
        </div>
    )
}

export default NewPost;