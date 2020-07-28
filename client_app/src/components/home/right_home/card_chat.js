import React, { Component } from 'react';
import Storage from '../../../helpers/storage';
import { connect } from 'react-redux';

class CardChat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contact: props.contact,
        }
        this.myRef = React.createRef();
    }


    async componentWillMount() {
        const { _id } = this.state?.contact;

        //this.getChannelDetail(_id);
    }
    componentDidMount() {

    }
    async componentWillReceiveProps(newProps) {
        this.setState({ contact: newProps.contact });
        //this.myRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
        // this.getChannelDetail(newProps?.contact?._id);
    }
    // async getChannelDetail(_id) {
    //     if (_id)
    //         await mainService.getChannelDetail(_id).then(res => {
    //             if (res.status === 200) {
    //                 this.setState({ channel: res.data, messages: res.data?.messages });
    //             }
    //         },
    //             err => {
    //                 if (err?.response?.data) {
    //                 }
    //             }
    //         );
    // }
    _renderMess() {
        const profilet_id = Storage.getAccount()._id;
        this.myRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
        if (!this.state.contact._id) {
            return <div className="row" style={{ textAlign: 'center' }}>
                <div className="col-md-12 msg_cotainer_send">
                    <h3>  Welcome new conversation</h3>
                    <h6>  Say something to start</h6>
                </div>
            </div>
        } else {
            return this.state.contact?.messages.map((e, i) => {
                const date = new Date(e?.time);
                if (e.account_id !== profilet_id) {
                    return <div className="d-flex justify-content-start mb-4" key={i}>
                        <div className="img_cont_msg">
                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                        </div>
                        <div className="msg_cotainer">
                            {e?.message}
                            <span className="msg_time">{date.getHours()} : {date.getMinutes()}</span>
                        </div>
                    </div>
                } else {
                    return <div className="d-flex justify-content-end mb-4" key={i}>
                        <div className="msg_cotainer_send">
                            {e?.message}
                            <span className="msg_time_send">{date.getHours()} : {date.getMinutes()}</span>
                        </div>
                        <div className="img_cont_msg">
                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                        </div>
                    </div>
                }
            });
        }
    }
    _rendNoneContact() {
        return <div className="row" style={{ textAlign: 'center' }}>
            <div className="col-md-12" style={{ paddingBottom: '2rem' }}>
                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_cont_none_msg" />
            </div>
            <div className="col-md-12 msg_cotainer_send">
                <h3>  Welcome {Storage.getAccount().account_name}</h3>
                <h6>select conversation to start</h6>
            </div>
        </div>
    }
    render() {
        return (
            // <div ref={this.myRef} id="demo">
            <div className="card-body msg_card_body" ref={this.myRef} id="demo">
                {this.props.contact.isNone ? this._rendNoneContact() : this._renderMess()}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        contact: state.changeContactReduct,
    };
}

export default connect(mapStateToProps, null)(CardChat);
