import React from 'react';
import s from './ProfileInfo.module.css';
import userProfileImage from '../../../assets/images/user.png';
import Preloader from '../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileInfoEdit from './ProfileInfoEdit';
import { useState } from 'react';

const ProfileInfoList = (props) => {
   return (
      <div>
         <div>
            {props.isOwner && <button className={s.profile_edit_btn} onClick={props.activateEditMode}>Edit profile</button>}
         </div>
         <ul>
            <li><b>About me:</b> {props.profile.aboutMe}</li>
            <li><b>Looking for a job:</b> {props.profile.lookingForAJob === true ? 'yes' : 'no'}</li>
            <li><b>Looking for a job desctription:</b> {props.profile.lookingForAJobDescription || ''}</li>
            <p></p>
            <li>
               <b>My contacts:</b>
               <ul>
                  <li className={s.contact_item}><b>Facebook:</b> {props.profile.contacts.facebook || ''}</li>
                  <li className={s.contact_item}><b>Website:</b> {props.profile.contacts.website || ''}</li>
                  <li className={s.contact_item}><b>VK:</b> {props.profile.contacts.vk || ''}</li>
                  <li className={s.contact_item}><b>Twitter:</b> {props.profile.contacts.twitter || ''}</li>
                  <li className={s.contact_item}><b>Instagram:</b> {props.profile.contacts.instagram || ''}</li>
                  <li className={s.contact_item}><b>Youtube:</b> {props.profile.contacts.youtube || ''}</li>
                  <li className={s.contact_item}><b>Github:</b> {props.profile.contacts.github || ''}</li>
               </ul>
            </li>
         </ul>
      </div>
   )
}

const ProfileInfo = (props) => {

   let [editProfile, setEditProfile] = useState(false)
   
   const activateEditMode = () => {
      setEditProfile(true)
   }

   const deactivateEditMode = () => {
      setEditProfile(false)
   }

    if (!props.profile) {
        return <Preloader />
    }

    const onAvatarImgSelected = (e) => {
       if (e.target.files.length) {
          props.savePhoto(e.target.files[0])
       }
    }

    const onSubmit = (formData, error) => {
       props.saveProfile(formData)
         .then( () => deactivateEditMode())
    }

    return (
        <div className={s.profile_container}>
            <div className={s.profile_avatar}>
                <img src={props.profile.photos.small || userProfileImage} alt="" />
                <div className={s.profile_avatar__upload}>
                  { props.isOwner && <input type="file" onChange={onAvatarImgSelected} />}
                </div>
            </div>
            <div className={s.profile_description}>
                <div className={s.profile__username}>{props.profile.fullName}</div>
                <ProfileStatusWithHooks 
                  status={props.status} 
                  updateUserStatus={props.updateUserStatus}
                  isOwner={props.isOwner}
                />
                <div className={s.profile__user_info}>
                    {editProfile
                     ? <ProfileInfoEdit initialValues={props.profile} onSubmit={onSubmit} deactivateEditMode={deactivateEditMode}/>
                     : <ProfileInfoList profile={props.profile} isOwner={props.isOwner} activateEditMode={activateEditMode}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;