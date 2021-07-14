import React from 'react';
import Navbar from './Navbar';

const NavbarContainer = (props) => {

    const store = props.store;

    return (
        <Navbar
        links={store.getState().navbar.links}
        friends={store.getState().navbar.friends} />
    )
}

export default NavbarContainer;