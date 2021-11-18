import React from 'react';
import s from './ProfileStatus.module.css';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
            status: this.props.status
        });
    }

    cancelEditStatus = () => {
        this.setState({
            editMode: false,
        });
    }

    sumbitNewStatus = () => {
        this.setState({
            editMode: false
        });
        this.props.updateUserStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState( {
            status: e.target.value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {
        return (
            <>
                { !this.state.editMode &&
                    <div onDoubleClick={this.activateEditMode} className={s.profile__user_status}>
                        <span>{this.props.status || '...'}</span>
                    </div>
                }
                { this.state.editMode &&
                    <div className={s.profile__user_status}>
                        <input onChange={this.onStatusChange} 
                            autoFocus={true} 
                            value={this.state.status}>
                        </input>
                        <div className={s.profile__user_status_btns}>
                            <button onClick={this.sumbitNewStatus}>Update status</button>
                            <button onClick={this.cancelEditStatus}>Cancel</button>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default ProfileStatus;