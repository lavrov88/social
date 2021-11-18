import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import userProfileImage from '../../assets/images/user.png';
import { getUserProfile } from '../../redux/profile-reducer';

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

const Friends = (props) => {

    const friendsElements = props.friends
        .map(f => {
            return (
                <li key={f.id} className={s.nav_friend_item}>
                    <div className={s.nav_friend_avatar}>
                        <img src={userProfileImage} alt="" />
                    </div>
                    <div>
                        {f.name}
                    </div>
                </li>
            )
        });

    return (        
        <ul className={s.nav_friends}>
            {friendsElements}
        </ul>
    )
}

const Navbar = (props) => {
    return (
        <nav className={s.nav}>
            <Links links={props.links} />
            <Friends friends={props.friends} />
        </nav>
    )
}

export default Navbar;