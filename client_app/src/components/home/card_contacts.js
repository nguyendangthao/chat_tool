import React, { Component } from 'react';
import mainService from '../../uitls/main_service';
import Storage from '../../helpers/storage';
import { connect } from 'react-redux';
import { CHANGE_CONTACT } from '../../constants/actionReduct';
import CardPersonal from './card_personal';

class CardContacts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyValue: '',
            accouts: [],
            contactId: ''
        }

    }
    async componentWillMount() {
        await this.getChannels();
    }
    async getChannels() {
        const obj = { _id: Storage.getAccount()._id }
        await mainService.getChannels(obj).then(res => {
            if (res.status === 200) {
                this.setState({ accouts: res.data, contactId: res.data[0]._id });
                this.props.changContactDispatch(CHANGE_CONTACT, res.data[0]);
            }

        },
            err => {
                if (err?.response?.data) {
                }
            }
        );
    }
    async search(e) {
        this.setState({ keyValue: e.target.value });
        if (e.target.value) {
            const obj = { keyValue: e.target.value, exceptId: Storage.getAccount()._id }
            await mainService.findAccount(obj).then(res => {
                if (res.status === 200)
                    this.setState({ accouts: res.data });
            },
                err => {
                    if (err.response.data) {
                    }
                }
            );
        } else
            await this.getChannels();
    }
    async clearSearch(e) {
        this.setState({ keyValue: '' });
        await this.getChannels();
    }
    async selectContact(e, item, i) {
        this.setState({ contactId: item._id });
        this.props.changContactDispatch(CHANGE_CONTACT, item);
    }
    _renderContact = () => {
        const { accouts } = this.state;
        let resuft = accouts.length === 0 ? <li></li> : accouts.map((e, i) =>
            <li className={'contact_Li ' + (this.state.contactId === e._id ? 'active' : '')} key={i}
                onClick={(event) => this.selectContact(event, e, i)}>
                <div className="d-flex bd-highlight">
                    <div className="img_cont">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" />
                        {!e.isGroup && <span className={e.isOnline ? 'online_icon' : 'away_icon'} />}
                    </div>
                    <div className="user_info">
                        <span>{e.account_name}</span>
                        <p>Kalid is online</p>
                    </div>
                </div>
            </li>
        );
        return resuft;
    }
    render() {
        return (
            <div className="col-md-4 col-xl-3 chat"><div className="card card-chat mb-sm-3 mb-md-0 contacts_card">
                <div className="card-header contacts_header">
                    <CardPersonal />
                    <div className="input-group">
                        <input type="text" placeholder="Search..." className="form-control search" onChange={(e) => this.search(e)} value={this.state.keyValue} />
                        <div className="input-group-prepend">
                            {this.state.keyValue && <span className="input-group-text search_btn" onClick={(e) => this.clearSearch(e)}><i className="fas fa-times" /></span>}
                        </div>
                    </div>
                </div>
                <div className="card-body contacts_body">
                    <ul className="contacts" >
                        {this._renderContact()}
                    </ul>
                </div>
                <div className="card-footer" />
            </div></div>
        );
    }
}


const mapPropsToDispatch = dispatch => ({
    changContactDispatch: (action, contact) => {
        return dispatch({
            type: action, contact
        });
    },
});

export default connect(null, mapPropsToDispatch)(CardContacts);
