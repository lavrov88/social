import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, actions, requestUsers } from '../../redux/users-reducer';
import Users from './Users'
import Preloader from '../Common/Preloader/Preloader';
import { getAuthorised, getCurrentPage, getFollowingInProgressStatus, getIsLoadingStatus, getPageSize, getTotalUsersCount, getUsers } from '../../redux/selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';
import s from './Users.module.css';

const setCurrentPage = actions.setCurrentPage

type StatePropsType = {
   authorised: boolean
   currentPage: number
   pageSize: number   
   isLoading: boolean
   totalUsersCount: number
   users: Array<UserType>
   followingInProgress: Array<number>
}
type DispatchPropsType = {
   requestUsers: (currentPage: number, pageSize: number) => void
   setCurrentPage: (pageNumber: number) => void
   follow: (userId: number) => void
   unfollow: (userId: number) => void
}
type OwnPropsType = {
   pageTitle: string
}
type PropsType = StatePropsType & DispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
        this.props.setCurrentPage(pageNumber);
    }

   render() {
      return <>
         {this.props.isLoading ? <Preloader /> : null}
         <h2 className={s.users_title}>{this.props.pageTitle}</h2>
         <Users
            authorised={this.props.authorised}
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            // toggleIsLoading={this.props.toggleIsLoading}
            // toggleFollowingProgress={this.props.toggleFollowingProgress}
            followingInProgress={this.props.followingInProgress}
         />
      </>
   }
}

const mapStateToProps = (state: AppStateType): StatePropsType => {
   return {
      authorised: getAuthorised(state),
      users: getUsers(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isLoading: getIsLoadingStatus(state),
      followingInProgress: getFollowingInProgressStatus(state),
   }
}

export default connect<StatePropsType, DispatchPropsType, OwnPropsType, AppStateType>
   (
      mapStateToProps, 
      { follow, unfollow, setCurrentPage, requestUsers }
   )(UsersContainer);