import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { refreshLatestUsers } from '../../redux/navbar-reducer';
import { AppStateType } from '../../redux/redux-store';
import { LinkType, NavUserType } from '../../types/types';
import Navbar from './Navbar';

type NavbarContainerPropsType = {
   store: any
   links: Array<LinkType>
   users: Array<NavUserType>
   loadNewUsers: () => void
   isLoading: boolean
}
const NavbarContainer: React.FC<NavbarContainerPropsType> = (props) => {

   const store = props.store;
   const dispatch = store.dispatch

   const loadNewUsers = () => {
      refreshLatestUsers()(dispatch)
   }

   useEffect(loadNewUsers, [])

   return (
      <Navbar
         links={props.links}
         users={props.users}
         loadNewUsers={loadNewUsers}
         isLoading={props.isLoading}
      />
   )
}

const mapStateToProps = (state: AppStateType) => {
   return {
      links: state.navbar.links,
      users: state.navbar.users,
      isLoading: state.navbar.isLoading
   }
}

export default connect(
   mapStateToProps, 
   { refreshLatestUsers }
)(NavbarContainer)