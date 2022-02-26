import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { getUserAuthData, setUserImg, logout, AuthInitialStateType } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';

type StatePropsType = {
   authData: AuthInitialStateType
}

type DispatchPropsType = {
   getUserAuthData: () => void
   setUserImg: (link: string | null) => void
   logout: () => void
}

type PropsType = StatePropsType & DispatchPropsType

class HeaderContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUserAuthData()
    }

    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType): StatePropsType => ({
    authData: state.auth
})

export default connect<StatePropsType, DispatchPropsType, null, AppStateType>
   (mapStateToProps, {getUserAuthData, setUserImg, logout})(HeaderContainer)