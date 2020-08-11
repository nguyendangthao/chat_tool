import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddGroup from '../modals/add_group';
import mainService from '../../../uitls/main_service';
import ChangeAvatar from '../modals/change_avatar';

class CardChatInfor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contact: props.contact,
            isAddGroup: false,
            isChangeAvatar: false
        }
    }
    addGroup() {
        this.setState({ isAddGroup: true })
    }
    closeGroup() {
        this.setState({ isAddGroup: false })
    }
    getAvatar = () => {
        if (this.props?.contact?.avatar) {
            return mainService.getAvatar(this.props.contact.avatar);
        }
        return 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg';
    }
    changeAvatar(e) {
        e.preventDefault();
        if (this.props?.contact?.isGroup)
            this.setState({ isChangeAvatar: true });
    }
    closeChangeAvater() {
        this.setState({ isChangeAvatar: false });
    }
    render() {
        return (
            <div className="d-flex bd-highlight">
                <div className="img_cont">
                    <img src={this.getAvatar()} className="rounded-circle user_img"
                        onClick={e => this.changeAvatar(e)} />
                    {!this.props?.contact?.isGroup && <span className={this.props.contact.isOnline ? 'online_icon' : 'away_icon'} />}
                </div>
                <div className="user_info">
                    <span>{this.props.contact.name || this.props.contact.account_name}</span>
                    <p>{this.props.contact?.messages?.length} Messages</p>
                </div>
                <div className="video_cam">
                    <span><i className="fas fa-video" /></span>
                    <span><i className="fas fa-phone" /></span>
                    <span onClick={() => this.addGroup()}><i className="fas fa-user-plus" /></span>
                </div>
                <AddGroup isAddGroup={this.state.isAddGroup} closeGroup={(e) => this.closeGroup()} />
                <ChangeAvatar isChangeAvatar={this.state.isChangeAvatar} close={() => this.closeChangeAvater()}
                    channel={this.props.contact} />
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

