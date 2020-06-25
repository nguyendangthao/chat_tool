import React, { Component } from 'react';
import mainService from '../../uitls/main_service';
import Storage from '../../helpers/storage';

class CardSend extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyValue: '',
            accouts: [],
            contactId: ''
        }

    }

    render() {
        return (
            <div className="input-group">
                <div className="input-group-append">
                    <span className="input-group-text attach_btn"><i className="fas fa-paperclip" /></span>
                </div>
                <textarea className="form-control type_msg" placeholder="Type your message..." defaultValue={""} />
                <div className="input-group-append">
                    <span className="input-group-text send_btn"><i className="fas fa-location-arrow" /></span>
                </div>
            </div>
        );
    }
}
export default CardSend
