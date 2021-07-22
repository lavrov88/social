import React from 'react';
import s from './ProfileInfo.module.css';
import userProfileImage from '../../../assets/images/user.png';

const ProfileInfo = () => {
    return (
        <div className={s.profile_container}>
            <div className={s.profile_avatar}>
                <img src={userProfileImage} alt="" />
            </div>
            <div className={s.profile_description}>
                <div className={s.profile__username}>Alexander Lavrov</div>
                <div className={s.profile__user_info}>
                    Date of birth: 09 june<br></br>
                    Location: Moscow<br></br>
                    Education: MIET '11<br></br>
                    Web-site: github.com
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;