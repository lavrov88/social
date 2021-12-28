import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import userProfileImage from '../../assets/images/user.png';

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.header_logo}>
                <h2>Social Network</h2>
            </div>            
            <div className={s.header_auth}>
                <div className={s.header_auth__avatar}>
                    {!props.authData.userImg
                        ? <img src={userProfileImage} alt="default img" />
                        : <img src={props.authData.userImg} alt="user img" /> }
                </div>
                <div className={s.header_auth__username}>
                    {props.authData.isAuthorised === true
                        ? <div>
                           <p>Logged user:</p>
                           <p>{props.authData.login}</p>
                           <p><button onClick={props.logout}>Log out</button></p>
                        </div>
                        : <NavLink to="/login">Login</NavLink>}
                </div> 
            </div>
        </header>
    )
}

export default Header;