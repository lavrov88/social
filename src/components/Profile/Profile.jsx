import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { Redirect } from 'react-router-dom';

const Profile = (props) => {
    return (
        <div className={s.content}>
            <img alt="" className={s.content_landscape} src="https://www.canon.ru/media/PCA%20Exercise%20-%20Landscape%20Photography%20exercise-landscape-photos-opener-05_1200%20x%20400_tcm203-1444470.jpg"></img>
            <div className={s.content_main}>
                <ProfileInfo profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} />
                <MyPostsContainer store={props.store} />
            </div>
        </div>
    )
}

export default Profile;