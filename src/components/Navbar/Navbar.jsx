import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import userProfileImage from '../../assets/images/user.png';
import Preloader from '../Common/Preloader/Preloader';

const Links = (props) => {
    const linksElements = props.links
        .map(l => {
            return (
                <li key={l.url} className={s.nav_li_item}>
                    <NavLink key={l.url} 
                    to={l.url} 
                    className={s.nav_item} 
                    activeClassName={s.active}>{l.name}</NavLink>
                </li>
            )
        });

    return (
        <ul className={s.nav_list}>
            {linksElements}
        </ul>
    )
}

const LatestRegistered = (props) => {

   if (props.isLoading) {
      return (
         <Preloader height='200' />
      )
   }

    const usersElements = props.users
        .map(u => {
            return (
                <li key={u.id + '_navbar'}>
                   <NavLink to={'/profile/' + u.id} className={s.nav_latest_user_item} >
                     <div className={s.nav_latest_user_avatar}>
                           <img src={userProfileImage} alt="" />
                     </div>
                     <div className={s.nav_latest_user_name}>
                           {u.name}
                     </div>
                    </NavLink>
                </li>
            )
        })

   return (
      <div>
         <ul className={s.nav_latest_users}>
            {usersElements}
         </ul>
      </div>

   )
}

const Navbar = (props) => {
    return (
        <nav className={s.nav}>
            <Links links={props.links} />
            <div className={s.latest_registered_wrapper}>
               <h3 onClick={props.loadNewUsers}>Latest registered:</h3>
               <LatestRegistered users={props.users} loadNewUsers={props.loadNewUsers} isLoading={props.isLoading} />
            </div>
        </nav>
    )
}

export default Navbar;