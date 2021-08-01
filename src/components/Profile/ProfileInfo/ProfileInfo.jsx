import React from 'react';
import s from './ProfileInfo.module.css';
import userProfileImage from '../../../assets/images/user.png';
import Preloader from '../../Common/Preloader/Preloader';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div className={s.profile_container}>
            <div className={s.profile_avatar}>
                <img src={props.profile.photos.small === null ? userProfileImage : props.profile.photos.small} alt="" />
            </div>
            <div className={s.profile_description}>
                <div className={s.profile__username}>{props.profile.fullName}</div>
                <div className={s.profile__user_info}>
                    <p>About me: {props.profile.aboutMe}</p>
                    <p>Looking for a job: {props.profile.lookingForAJob === true ? 'yes' : 'no'}</p>
                    <p>Looking for a job desctription: {props.profile.lookingForAJobDescription === null ? '' : props.profile.lookingForAJobDescription}</p>
                    <p></p>
                    <p>My contacts:</p>
                    <p>Facebook: {props.profile.contacts.facebook === null ? '' : props.profile.contacts.facebook}</p>
                    <p>Website: {props.profile.contacts.website === null ? '' : props.profile.contacts.website}</p>
                    <p>VK: {props.profile.contacts.vk === null ? '' : props.profile.contacts.vk}</p>
                    <p>Twitter: {props.profile.contacts.twitter === null ? '' : props.profile.contacts.twitter}</p>
                    <p>Instagram: {props.profile.contacts.instagram === null ? '' : props.profile.contacts.instagram}</p>
                    <p>Youtube: {props.profile.contacts.youtube === null ? '' : props.profile.contacts.youtube}</p>
                    <p>Github: {props.profile.contacts.github === null ? '' : props.profile.contacts.github}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;