import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { refreshLatestUsers } from '../../redux/navbar-reducer';
import Navbar from './Navbar';

const NavbarContainer = (props) => {

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

const mapStateToProps = (state) => {
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