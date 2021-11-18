import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

let mapStateToPropsRedirect = (state) => ({
    isAuthorised: state.auth.isAuthorised
});

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuthorised) return <Redirect to='/login' />
            return <Component {...this.props} />
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent);
    return ConnectedAuthRedirectComponent;
}