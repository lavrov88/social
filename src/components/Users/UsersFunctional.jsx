import * as axios from 'axios';
import React from 'react';
import s from './Users.module.css';
import userProfileImage from '../../assets/images/user.png';

const UserItem = (props) => {
    return (
        <div className={s.user_item}>
            <div className={s.user_item__left}>
                <div className={s.avatar_wrapper}>
                    <img className={s.user_item__avatar} src={props.avatar} alt="" />
                </div>
                {props.followed 
                ? <button onClick={() => {props.unfollow(props.id)}} className={s.user_item__unfollow_btn}>Unfollow</button> 
                : <button onClick={() => {props.follow(props.id)}} className={s.user_item__follow_btn}>Follow</button>}
            </div>
            <div className={s.user_item__right}>
                <div className={s.user_item__name_and_status}>
                    <p className={s.user_item__user_fullname}>{props.fullname}</p>
                    <p className={s.user_item__user_status}>{props.status}</p>
                </div>
                <div className={s.user_item__location}>
                    <p className={s.user_item__country}>{props.country},</p>
                    <p className={s.user_item__city}>{props.city}</p>
                </div>
            </div>
        </div>
    )
}

const Users = (props) => {
    console.log(props);
    if (props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                props.setUsers(response.data.items);
            });
    }

    const UsersList = props.users.map(u => <UserItem 
        key={u.id}
        id={u.id}
        avatar={u.photos.small || userProfileImage}
        followed={u.followed}
        fullname={u.name}
        status={u.status}
        country={"u.location.country"}
        city={"u.location.city"}
        follow={props.follow}
        unfollow={props.unfollow} />);

    return (
        <div className={s.users_wrapper}>
            <div className={s.users_list}>
                { UsersList }
            </div>
            <button  className={s.users__show_more}>Show more</button>
        </div>
    )
}

export default Users;