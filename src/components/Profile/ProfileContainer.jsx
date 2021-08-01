import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { profileAPI } from '../../api/api';

class ProfileContainer extends React.Component {
    componentDidMount() {

        let defaultUserData = {
            aboutMe: "учу реакт",
            contacts: {
                facebook: null,
                website: null,
                vk: null,
                twitter: null,
                instagram: null,
                youtube: null,
                github: null,
                mainLink: null
            },
            lookingForAJob: false,
            lookingForAJobDescription: null,
            fullName: "Alexander",
            userId: 2,
            photos: {
                small: null,
                large: null
            }
        }


        let userId = this.props.match.params.userId;
        if (!userId) {
            this.props.setUserProfile(defaultUserData);
            return;
        }

        profileAPI.getProfile(userId)
            .then(data => {
                this.props.setUserProfile(data);
            });
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
});

let WithUrlDataProfileContainer = withRouter(ProfileContainer);
export default connect(mapStateToProps, 
    {setUserProfile})(WithUrlDataProfileContainer);