import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import userProfileImage from '../../assets/images/user.png';

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.header_logo}>
                {/* <img alt="" src="https://logomaster.ai/static/media/gallery002.27efc7d2.png"></img> */}
                <h2>Social Network</h2>
            </div>            
            <div className={s.header_auth}>
                <div className={s.header_auth__avatar}>
                    {props.authData.userImg === null
                        ? <img src={userProfileImage} alt="" />
                        : <img src={props.authData.userImg} alt="" /> }
                </div>
                <div className={s.header_auth__username}>
                    {props.authData.isAuthorised === true
                        ? <NavLink to="/login"><p>Logged user:</p><p>{props.authData.login}</p></NavLink>
                        : <NavLink to="/login">Login</NavLink>}
                </div> 
            </div>
        </header>
    )
}

export default Header;