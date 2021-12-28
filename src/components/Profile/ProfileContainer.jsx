import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

   refreshProfile() {
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

   componentDidMount() {
      this.refreshProfile()
   }

   componentDidUpdate(prevProps) {
      if (this.props.match.params.userId != prevProps.match.params.userId) {
         this.refreshProfile()
      }
   }

    render() {
        return (
            <Profile {...this.props} 
                userId={this.props.match.params.userId || this.props.authorizedUserId}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                savePhoto={this.props.savePhoto}
                saveProfile={this.props.saveProfile}
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
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    withRouter,
)
(ProfileContainer);