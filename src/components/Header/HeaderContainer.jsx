import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { setUserAuth, setUserImg } from '../../redux/auth-reducer';
import { authAPI, profileAPI } from '../../api/api';

class HeaderContainer extends React.Component {
    componentDidMount() {
        let currentUserId = null;
        authAPI.checkAuth()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data;
                    let isAuthorised = true;
                    currentUserId = data.data.id;
                    this.props.setUserAuth(id, email, login, isAuthorised);
                }

                if (currentUserId !== null) {
                profileAPI.getProfile()
                    .then(response => {
                        this.props.setUserImg(response.data.photos.small);
                    });
                }
            });
    }

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state) => ({
    authData: state.auth
})

export default connect(mapStateToProps, {setUserAuth, setUserImg})(HeaderContainer);