import React from 'react';
import s from './Users.module.css';
import userProfileImage from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import { userAPI } from '../../api/api';

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let BeginButton = () => {
        if (props.currentPage > 1) {return (
            <span onClick={() => props.onPageChanged(1)} className={s.users__pagination_item}>{`<<`}</span>
        )} else {return null}
    }
    let EndButton = () => {
        if (props.currentPage < pagesCount) {return (
            <span onClick={() => props.onPageChanged(pagesCount)} className={s.users__pagination_item}>{`>>`}</span>
        )} else {return null}
    }
    return (
        <div className={s.users_wrapper}>
            <div className={s.users__pagination}>
                {<BeginButton />}
                {pages.map(p => {
                    if (props.currentPage - p > 5 || props.currentPage - p < -5) {
                        return '';
                    }
                    return (
                        <span
                            key={p}
                            onClick={() => props.onPageChanged(p)}
                            className={`${s.users__pagination_item} ${props.currentPage === p ? s.active : ''}`}>{p}</span>
                    )
                })
                }
                {<EndButton />}
            </div>
            <div className={s.users_list}>
                {
                    props.users.map(u => (
                        <div key={u.id} className={s.user_item}>
                            <div className={s.user_item__left}>
                                <div className={s.avatar_wrapper}>
                                    <NavLink to={'/profile/' + u.id}>
                                        <img className={s.user_item__avatar} src={u.photos.small || userProfileImage} alt="" />
                                    </NavLink>
                                </div>
                                {u.followed

                                    ? <button onClick={() => {
                                        props.toggleIsLoading(true);
                                        // axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        //     withCredentials: true,
                                        //     headers: {
                                        //         "API-KEY": "398d65df-f6f7-4c97-bcae-4a9af02f64f4"
                                        //     }
                                        // })
                                        userAPI.unfollowUser(u.id)
                                            .then(data => {
                                                if (data.resultCode === 0) {
                                                    props.unfollow(u.id)
                                                }
                                                props.toggleIsLoading(false);
                                            });
                                        }} className={s.user_item__unfollow_btn}>Unfollow</button>

                                    : <button onClick={() => {
                                        props.toggleIsLoading(true);
                                        userAPI.followUser(u.id)
                                            .then(data => {
                                                if (data.resultCode === 0) {
                                                    props.follow(u.id)
                                                }
                                                props.toggleIsLoading(false);
                                            });
                                    }
                                    } className={s.user_item__follow_btn}>Follow</button>}

                            </div>
                            <div className={s.user_item__right}>
                                <div className={s.user_item__name_and_status}>
                                    <NavLink to={'/profile/' + u.id}>
                                        <p className={s.user_item__user_fullname}>{u.name}</p>
                                    </NavLink>
                                    <p className={s.user_item__user_status}>{u.status}</p>
                                </div>
                                <div className={s.user_item__location}>
                                    <p className={s.user_item__country}>{"u.location.country"},</p>
                                    <p className={s.user_item__city}>{"u.location.country"}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Users;