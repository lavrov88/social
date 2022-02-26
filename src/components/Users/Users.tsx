import React from 'react';
import s from './Users.module.css';
import userProfileImage from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import Paginator from '../Common/Paginator/Paginator';
import { UserType } from '../../types/types';

type UserItemPropsType = {
   authorised: boolean
   user: UserType
   follow: (userId: number) => void
   unfollow: (userId: number) => void
   followingInProgress: Array<number>
}
const UserItem: React.FC<UserItemPropsType> = ({ authorised, user, follow, unfollow, followingInProgress }) => {
   return (
      <div key={user.id} className={s.user_item}>
         <div className={s.user_item__left}>
            <div className={s.avatar_wrapper}>
               <NavLink to={'/profile/' + user.id}>
                  <img className={s.user_item__avatar} src={user.photos.small || userProfileImage} alt="" />
               </NavLink>
            </div>

            {user.followed
               ? <button
                  disabled={followingInProgress.some(id => id === user.id)}
                  onClick={() => { unfollow(user.id) }}
                  className={s.user_item__unfollow_btn}
               >Unfollow</button>

               : <button
                  disabled={followingInProgress.some(id => id === user.id) || !authorised}
                  onClick={() => { follow(user.id) }}
                  className={s.user_item__follow_btn}
               >Follow</button>}

         </div>
         <div className={s.user_item__right}>
            <div className={s.user_item__name_and_status}>
               <NavLink to={'/profile/' + user.id}>
                  <p className={s.user_item__user_fullname}>{user.name}</p>
               </NavLink>
               {user.status && <p className={s.user_item__user_status}>{user.status}</p> }
            </div>
         </div>
      </div>
   )
}

type UsersPropsType = {
   authorised: boolean
   totalUsersCount: number
   pageSize: number
   currentPage: number
   onPageChanged: (newPage: number) => void
   users: Array<UserType>
   follow: (userId: number) => void
   unfollow: (userId: number) => void
   followingInProgress: Array<number>
}
const Users: React.FC<UsersPropsType> = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div className={s.users_wrapper}>
             <Paginator
               pages={pages}
               currentPage={props.currentPage}
               onPageChanged={props.onPageChanged}
               pagesCount={pagesCount}
               paginationItemStyle={s.users__pagination_item}
               paginationDivStyle={s.users__pagination}
               activeItemStyle={s.active}
            />
            <div className={s.users_list}>
                {
                    props.users.map(u => (
                        <UserItem 
                           authorised={props.authorised}
                           key={u.id}
                           user={u}
                           follow={props.follow}
                           unfollow={props.unfollow}
                           followingInProgress={props.followingInProgress}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Users;