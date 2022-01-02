import React from 'react';
import s from './ProfileInfo.module.css';
import userProfileImage from '../../../assets/images/user.png';
import Preloader from '../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileInfoEdit from './ProfileInfoEdit';
import { useState } from 'react';
import Button from '../../Common/Button/Button';

const ProfileInfoList = (props) => {
   const contactsData = [
      { name: 'Facebook', source: props.profile.contacts.facebook },
      { name: 'Website', source: props.profile.contacts.website },
      { name: 'VK', source: props.profile.contacts.vk },
      { name: 'Twitter', source: props.profile.contacts.twitter },
      { name: 'Instagram', source: props.profile.contacts.instagram },
      { name: 'Youtube', source: props.profile.contacts.youtube },
      { name: 'Github', source: props.profile.contacts.github },
   ]
   const contactsItems = []
   const ContactItem = ({name, source}) => {
      return <li className={s.contact_item}> <b>{name}: </b><a target='_blank' rel="noreferrer" href={'http://' + source}>{source} </a></li>
   }

   contactsData.forEach(contact => {
      if (contact.source) {
         contactsItems.push(<ContactItem name={contact.name}  key={contact.name} source={contact.source} />)
      }
   })

   return (
      <div className={s.profile_info}>
         <div>
            {props.isOwner && <Button action={props.activateEditMode} type="normal" text="Edit profile" />}
         </div>
         <ul className={s.profile_info_items}>
            <li><b>About me:</b> {props.profile.aboutMe}</li>
            <li><b>Looking for a job:</b> {props.profile.lookingForAJob === true ? 'yes' : 'no'}</li>
            <li><b>Looking for a job desctription:</b> {props.profile.lookingForAJobDescription || ''}</li>
            <p></p>
            <li>
               <b>My contacts:</b>
               <ul className={s.profile_info_contacts}>
                  {contactsItems}
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

    if (props.isLoading) {
       return (
          <Preloader />
       )
    }

    return (
        <div className={s.profile_container}>
            <div className={s.profile_avatar}>
                <img src={props.profile.photos.small || userProfileImage} alt="" />
                <div className={s.profile_avatar__upload}>
                  { props.isOwner && <div>
                     <input type="file" onChange={onAvatarImgSelected} id="photo_upload" className={s.hide} />
                     <label htmlFor="photo_upload">
                        Change photo
                     </label>
                  </div> }
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
                     ? <ProfileInfoEdit initialValues={props.profile} onSubmit={onSubmit} deactivateEditMode={deactivateEditMode} />
                     : <ProfileInfoList profile={props.profile} isOwner={props.isOwner} activateEditMode={activateEditMode} />
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;