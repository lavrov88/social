import * as axios from 'axios';
import React from 'react';
import s from './Users.module.css';
import userProfileImage from '../../assets/images/user.png';

class Users extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return (
            <div className={s.users_wrapper}>
                <div className={s.users__pagination}>
                    {
                        pages.map(p => {
                            return (
                                <span 
                                    key={p}
                                    onClick={() => this.onPageChanged(p)}
                                    className={`${s.users__pagination_item} ${this.props.currentPage === p && s.active}`}>{p}</span>
                            )
                        })
                    }
                </div>
                <div className={s.users_list}>
                    {
                        this.props.users.map(u => (
                            <div key={u.id} className={s.user_item}>
                                <div className={s.user_item__left}>
                                    <div className={s.avatar_wrapper}>
                                        <img className={s.user_item__avatar} src={u.photos.small || userProfileImage} alt="" />
                                    </div>
                                    {u.followed
                                        ? <button onClick={() => { this.props.unfollow(u.id) }} className={s.user_item__unfollow_btn}>Unfollow</button>
                                        : <button onClick={() => { this.props.follow(u.id) }} className={s.user_item__follow_btn}>Follow</button>}
                                </div>
                                <div className={s.user_item__right}>
                                    <div className={s.user_item__name_and_status}>
                                        <p className={s.user_item__user_fullname}>{u.name}</p>
                                        <p className={s.user_item__user_status}>{u.status}</p>
                                    </div>
                                    <div className={s.user_item__location}>
                                        <p className={s.user_item__country}>{"u.location.country"},</p>
                                        <p className={s.user_item__city}>{"u.location.country"}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* <button className={s.users__show_more}>Show more</button> */}
            </div>
        )
    }
}

export default Users;