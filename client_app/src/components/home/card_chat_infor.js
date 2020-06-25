import React, { Component } from 'react';
import mainService from '../../uitls/main_service';
import Storage from '../../helpers/storage';
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
                    <p>1767 Messages</p>
                </div>
                <div className="video_cam">
                    <span><i className="fas fa-video" /></span>
                    <span><i className="fas fa-phone" /></span>
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

