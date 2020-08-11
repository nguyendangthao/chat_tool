import React, { Component } from 'react';
import Storage from '../../../helpers/storage';
import { CardPersonalOption } from './card_personal_option';
import mainService from '../../../uitls/main_service';
import ChangeAvatar from "../modals/change_avatar";
class CardPersonal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowOption: false,
            isShowStatus: false,
            isOnline: Storage.getAccount()?.isOnline,
            isChangeAvatar: false,
            avatarUrl: 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg'
        }
    }
    componentDidMount() {
        if (Storage.getAccount().personal.avatar) {
            this.setState({ avatarUrl: mainService.getAvatar(Storage.getAccount().personal.avatar) })
        }
        document.addEventListener('mousedown', this.handleClickOutsideStatus);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutsideStatus);
    }

    handleClickOutsideStatus = (event) => {
        if (this.state.isShowStatus) {
            if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
                this.setState({ isShowStatus: !this.state.isShowStatus })
            }
        }
    }


    openOption(e) {
        e.preventDefault();
        this.setState({ isShowOption: !this.state.isShowOption });
    }
    openChangeStatus(e) {
        e.preventDefault();
        this.setState({ isShowStatus: !this.state.isShowStatus });
    }
    async changeStatus(e, status) {
        e.preventDefault();
        await mainService.changeStatus({ isOnline: status }).then(res => {
            if (res.status === 200) {
                this.setState({ isOnline: status, isShowStatus: !this.state.isShowStatus });
                let acc = Storage.getAccount();
                acc.isOnline = status;
                Storage.updateAccount(acc);
            }
        },
            err => {
                if (err?.response?.data) {
                }
            }
        );
    }
    changeAvatar(e) {
        e.preventDefault();
        this.setState({ isChangeAvatar: !this.state.isChangeAvatar });
    }
    closeChangeAvater() {
        if (Storage.getAccount().personal.avatar) {
            this.setState({ avatarUrl: mainService.getAvatar(Storage.getAccount().personal.avatar), isChangeAvatar: false })
        } else {
            this.setState({ isChangeAvatar: false });
        }
    }
    render() {
        const profile = Storage.getAccount()
        return (
            <div className="d-flex bd-highlight" style={{ paddingBottom: '1rem' }}>
                <div className="img_cont">
                    <img src={this.state.avatarUrl} className="rounded-circle user_img"
                        onClick={e => this.changeAvatar(e)} />
                    <span className={this.state.isOnline ? 'online_icon' : 'away_icon'} onClick={e => this.openChangeStatus(e)} />
                    {
                        this.state.isShowStatus &&
                        <div className="action_menu status_menu" ref={ref => this.wrapperRef = ref}>
                            <ul>
                                <li onClick={e => this.changeStatus(e, true)}> Online</li>
                                <li onClick={e => this.changeStatus(e, false)}> Away</li>
                            </ul>
                        </div>
                    }

                </div>
                <div className="user_info">
                    <span>{profile?.account_name}</span>
                    <p>{profile?.phone_number}</p>
                </div>
                <span id="action_menu_btn" onClick={e => this.openOption(e)}><i className="fas fa-ellipsis-v" /></span>
                {this.state.isShowOption && <CardPersonalOption close={() => this.setState({ isShowOption: !this.state.isShowOption })} />}
                <ChangeAvatar isChangeAvatar={this.state.isChangeAvatar} close={() => this.closeChangeAvater()} />
            </div >

        );
    }
}


export default CardPersonal;

