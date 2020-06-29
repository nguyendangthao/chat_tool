import React, { Component } from 'react';
import CardContacts from './card_contacts';
import CardChat from './card_chat';
import CardSend from './card_send';
import CardChatInfor from './card_chat_infor';
import CardChatOption from './card_chat_option';
class IndexHome extends Component {

    render() {
        return (

            <div className="container-fluid h-100 container-chat">
                <div className="row justify-content-center h-100">
                    <CardContacts />
                    <div className="col-md-8 col-xl-6 chat">
                        <div className="card card-chat">
                            <div className="card-header msg_head">
                                <CardChatInfor />
                                <CardChatOption />
                            </div>
                            <div className="card-body msg_card_body">
                                <CardChat />
                            </div>
                            <div className="card-footer">
                                <CardSend />
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}
export default IndexHome
