import React from 'react';
import s from './Users.module.css';
import userProfileImage from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';

const Paginator = ({pages, currentPage, onPageChanged, pagesCount}) => {
   const BeginButton = () => {
      if (currentPage > 1) {return (
          <span onClick={() => onPageChanged(1)} className={s.users__pagination_item}>{`<<`}</span>
      )} else {return null}
  }
  const EndButton = () => {
      if (currentPage < pagesCount) {return (
          <span onClick={() => onPageChanged(pagesCount)} className={s.users__pagination_item}>{`>>`}</span>
      )} else {return null}
  }
  
   return (
      <div className={s.users__pagination}>
         {<BeginButton />}
         {pages.map(p => {
            if (currentPage - p > 5 || currentPage - p < -5) {
               return '';
            }
            return (
               <span
                  key={p}
                  onClick={() => onPageChanged(p)}
                  className={`${s.users__pagination_item} ${currentPage === p ? s.active : ''}`}
               >{p}</span>
            )
         })}
         {<EndButton />}
      </div>
   )
}

const UserItem = ({ user, follow, unfollow, followingInProgress }) => {
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
                  disabled={followingInProgress.some(id => id === user.id)}
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

const Users = (props) => {
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
            />
            <div className={s.users_list}>
                {
                    props.users.map(u => (
                        <UserItem 
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