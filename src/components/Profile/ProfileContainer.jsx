import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, updateUserStatus } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    componentDidMount() {

      //   let defaultUserData = {
      //       aboutMe: "учу реакт",
      //       contacts: {
      //           facebook: null,
      //           website: null,
      //           vk: null,
      //           twitter: null,
      //           instagram: null,
      //           youtube: null,
      //           github: null,
      //           mainLink: null
      //       },
      //       lookingForAJob: false,
      //       lookingForAJobDescription: null,
      //       fullName: "Alexander",
      //       userId: 2,
      //       photos: {
      //           small: null,
      //           large: null
      //       }
      //   }

        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
               this.props.history.push('/login')
            }
        }

        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return (
            <Profile {...this.props} 
                userId={this.props.match.params.userId || this.props.authorizedUserId}
                profile={this.props.profile} 
                status={this.props.status}
                updateUserStatus={this.props.updateUserStatus} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuthorised
});

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    //withAuthRedirect
)
(ProfileContainer);