import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, Textarea } from '../../Common/FormsControls/FormsControls';
import s from './ProfileInfo.module.css';

const ProfileInfoEdit = ({deactivateEditMode, handleSubmit, error}) => {
   return (
      <form onSubmit={handleSubmit}>
         <div>
            <button className={s.profile_edit_btn} type="submit" >Save changes</button>
            <button className={s.profile_edit_btn} onClick={deactivateEditMode} type="button">Cancel</button>
         </div>
         <div className={s.common_error}>
             {error}
          </div>
         <form>
         <ul>
            <li><b>Full name:</b><Field placeholder={""} name={"fullName"} component={Input} /></li>
            <li><b>About me:</b><Field placeholder={""} name={"aboutMe"} component={Textarea} /></li>
            <li><b>Looking for a job:</b> <Field placeholder={""} name={"lookingForAJob"} component={'input'} type={'checkbox'} /></li>
            <li><b>Looking for a job desctription:</b><Field placeholder={""} name={"lookingForAJobDescription"} component={Textarea} /></li>
            <p></p>
            <li>
               <b>My contacts:</b>
               <ul>
                  <li className={s.contact_item}><b>Facebook:</b> <Field placeholder={""} name={"contacts.facebook"} component={Input} /></li>
                  <li className={s.contact_item}><b>Website:</b> <Field placeholder={""} name={"contacts.website"} component={Input} /></li>
                  <li className={s.contact_item}><b>VK:</b> <Field placeholder={""} name={"contacts.vk"} component={Input} /></li>
                  <li className={s.contact_item}><b>Twitter:</b> <Field placeholder={""} name={"contacts.twitter"} component={Input} /></li>
                  <li className={s.contact_item}><b>Instagram:</b> <Field placeholder={""} name={"contacts.instagram"} component={Input} /></li>
                  <li className={s.contact_item}><b>Youtube:</b> <Field placeholder={""} name={"contacts.youtube"} component={Input} /></li>
                  <li className={s.contact_item}><b>Github:</b> <Field placeholder={""} name={"contacts.github"} component={Input} /></li>
               </ul>
            </li>
         </ul>
         </form>
         
      </form>
   )
}

const ProfileInfoEditForm = reduxForm({form: 'edit-profile'})(ProfileInfoEdit)

export default ProfileInfoEditForm