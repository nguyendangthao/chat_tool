import React, { Component } from 'react';
import CardContacts from './left_home/card_contacts';
import CardChat from './right_home/card_chat';
import CardSend from './right_home/card_send';
import CardChatInfor from './right_home/card_chat_infor';
import CardChatOption from './right_home/card_chat_option';
import { connect } from 'react-redux';
import Storage from '../../helpers/storage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class IndexHome extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container-fluid h-100 container-chat">
                {
                    !Storage.isLoggednIn() ? this.props.history.push('/login') :
                        <div className="row justify-content-center h-100">
                            <CardContacts />
                            <div className="col-md-8 col-xl-6 chat">
                                <div className="card card-chat">
                                    <div className="card-header msg_head">
                                        {!this.props.contact.isNone && <CardChatInfor />}
                                        {!this.props.contact.isNone && <CardChatOption />}
                                    </div>
                                    {/* <div className="card-body msg_card_body"> */}
                                    <CardChat />
                                    {/* </div> */}
                                    <div className="card-footer">
                                        {!this.props.contact.isNone && <CardSend />}
                                    </div>
                                </div>
                            </div>
                        </div>
                }
                <ToastContainer />
            </div >

        );
    }
}

function mapStateToProps(state) {
    return {
        contact: state.changeContactReduct,
    };
}
const mapPropsToDispatch = dispatch => ({
    changContactDispatch: (action, contact) => {
        return dispatch({
            type: action, contact
        });
    },
});

export default connect(mapStateToProps, mapPropsToDispatch)(IndexHome);