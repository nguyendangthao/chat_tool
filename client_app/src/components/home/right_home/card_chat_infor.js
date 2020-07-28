import React, { Component } from 'react';
import { connect } from 'react-redux';
class CardChatInfor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contact: props.contact
        }
    }

    render() {
        return (
            <div className="d-flex bd-highlight">
                <div className="img_cont">
                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" />
                    <span className={this.props.contact.isOnline ? 'online_icon' : 'away_icon'} />
                </div>
                <div className="user_info">
                    <span>{this.props.contact.account_name}</span>
                    <p>{this.props.contact?.messages?.length} Messages</p>
                </div>
                <div className="video_cam">
                    <span><i className="fas fa-video" /></span>
                    <span><i className="fas fa-phone" /></span>
                    <span><i className="fas fa-user-plus" /></span>
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
export default connect(mapStateToProps, mapPropsToDispatch)(CardChatInfor);

