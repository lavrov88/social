import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { getUserAuthData, setUserImg, logout } from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getUserAuthData();
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

export default connect(mapStateToProps, {getUserAuthData, setUserImg, logout})(HeaderContainer);