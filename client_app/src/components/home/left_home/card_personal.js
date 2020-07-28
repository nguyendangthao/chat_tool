import React, { Component } from 'react';
import Storage from '../../../helpers/storage';
import { CardPersonalOption } from './card_personal_option';
import mainService from '../../../uitls/main_service';

class CardPersonal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowOption: false,
            isShowStatus: false,
            isOnline: Storage.getAccount()?.isOnline
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
            }
        },
            err => {
                if (err?.response?.data) {
                }
            }
        );
    }
    render() {
        const profile = Storage.getAccount()
        return (
            <div className="d-flex bd-highlight" style={{ paddingBottom: '1rem' }}>
                <div className="img_cont">
                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" />
                    <span className={this.state.isOnline ? 'online_icon' : 'away_icon'} onClick={e => this.openChangeStatus(e)} />
                    {
                        this.state.isShowStatus &&
                        <div className="action_menu status_menu">
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
                {this.state.isShowOption && <CardPersonalOption />}
           
            </div >

        );
    }
}


export default CardPersonal;

