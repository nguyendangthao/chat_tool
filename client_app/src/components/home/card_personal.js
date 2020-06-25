import React, { Component } from 'react';
import Storage from '../../helpers/storage';

class CardPersonal extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        const profile = Storage.getAccount()
        return (
            <div className="d-flex bd-highlight" style={{ paddingBottom: '1rem' }}>
                <div className="img_cont">
                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" />
                    <span className={profile?.isOnline ? 'online_icon' : 'away_icon'} />
                </div>
                <div className="user_info">
                    <span>{profile?.account_name}</span>
                    <p>{profile?.phone_number}</p>
                </div>
                <span id="action_menu_btn"><i className="fas fa-ellipsis-v" /></span>
            </div >

        );
    }
}


export default CardPersonal;

