import React, { Component } from 'react';
import Storage from '../../../helpers/storage';
import ActionChatSocket from "../../../helpers/action_chat_socket";
import { connect } from 'react-redux';

class CardSend extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            accouts: [],
            contactId: ''
        }
    }
    componentWillReceiveProps() {
        this.sendRef.focus();
    }
    sendMess(e) {
        if (e.key === 'Enter' && this.state?.message?.trim()) {
            e.preventDefault();
            const { contact } = this.props
            const user = Storage.getAccount();
            contact.messages.push({
                message: this.state.message,
                time: new Date().toISOString(),
                account_id: user._id,
                account_name: user.account_name
            })
            ActionChatSocket.sendMessage({ contact, userSend: user })
            this.setState({ message: '' });
        }
        if (e.key === 'Enter' && !this.state?.message) {
            e.preventDefault();
        }
    }
    handleChange(e) {
        this.setState({ message: e.target.value });
    }
    render() {
        return (
            <div className="input-group">
                <div className="input-group-append">
                    <span className="input-group-text attach_btn"><i className="fas fa-paperclip" /></span>
                </div>
                <textarea className="form-control type_msg" placeholder="Type your message..." ref={input => this.sendRef = input}
                    onChange={e => this.handleChange(e)} value={this.state.message} onKeyDown={e => this.sendMess(e)} />
                <div className="input-group-append">
                    <span className="input-group-text send_btn"><i className="fas fa-location-arrow" /></span>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        contact: state.changeContactReduct,
    };
}
const mapPropsToDispatch = dispatch => ({
    addOderDispatch: (action, data) => {
        return dispatch({
            type: action,
            dataOrder: data
        });
    },
});
export default connect(mapStateToProps, mapPropsToDispatch)(CardSend);

