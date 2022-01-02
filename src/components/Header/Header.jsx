import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import userProfileImage from '../../assets/images/user.png';
import Button from '../Common/Button/Button';

const Header = (props) => {
   let auth = props.authData.isAuthorised
    return (
        <header className={s.header}>
            <div className={s.header_logo}>
                <h2>Social Network</h2>
            </div>            
            <div className={s.header_auth}>
                <div className={s.header_auth__avatar + ' ' + (auth ? s.avatar_auth : s.avatar_non_auth)}>
                    {!props.authData.userImg
                        ? <img src={userProfileImage} alt="default img" />
                        : <img src={props.authData.userImg} alt="user img" /> }
                </div>
                <div className={s.header_auth__username}>
                    {props.authData.isAuthorised === true
                        ? <div>
                           <p>Logged user:</p>
                           <p>{props.authData.login}</p>
                           <p><Button type="white" text="Logout" action={props.logout} /></p>
                        </div>
                        : <div>
                           <NavLink to="/login" className={s.btn_white}>Login</NavLink>
                        </div> }
                </div> 
            </div>
        </header>
    )
}

export default Header;