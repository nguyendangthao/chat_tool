import React, { Component } from 'react';
import mainService from '../../uitls/main_service';
import Storage from '../../helpers/storage';
import { connect } from 'react-redux';
class CardChat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            _id: '',
            channel: {},
            messages: [],
            contactId: ''
        }

    }


    async componentWillMount() {
        const { _id } = this.props?.contact;
        this.getChannelDetail(_id);
    }
    async componentWillReceiveProps(newProps) {
        this.getChannelDetail(newProps?.contact?._id);
    }
    async getChannelDetail(_id) {
        debugger
        if (_id)
            await mainService.getChannelDetail(_id).then(res => {
                if (res.status === 200) {
                    this.setState({ channel: res.data, messages: res.data?.messages });
                }
            },
                err => {
                    if (err?.response?.data) {
                    }
                }
            );
    }
    _renderMess() {
        const profilet_id = Storage.getAccount()._id;
        if (this.state.messages.length === 0) {
            return <div>
                <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                    </div>
                    <div className="msg_cotainer">
                        Hi, how are you samim?
        <span className="msg_time">8:40 AM, Today</span>
                    </div>
                </div>

                <div className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                        Hi Khalid i am good tnx how about you?
       <span className="msg_time_send">8:55 AM, Today</span>
                    </div>
                    <div className="img_cont_msg">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                    </div>
                </div>
            </div>
        } else {
            return this.state.messages.map((e, i) => {
                if (e.user_id !== profilet_id) {
                    return <div className="d-flex justify-content-start mb-4" key={i}>
                        <div className="img_cont_msg">
                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                        </div>
                        <div className="msg_cotainer">
                            {e?.message}
                            <span className="msg_time">{e?.time}</span>
                        </div>
                    </div>
                } else {
                    return <div className="d-flex justify-content-end mb-4" key={i}>
                        <div className="msg_cotainer_send">
                            {e?.message}
                            <span className="msg_time_send">{e?.time}</span>
                        </div>
                        <div className="img_cont_msg">
                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                        </div>
                    </div>
                }
            });
        }
    }
    render() {
        return (
            <div>
                {this._renderMess()}
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
export default connect(mapStateToProps, mapPropsToDispatch)(CardChat);
