import React, { Component } from 'react';
import mainService from '../../../uitls/main_service';
import Storage from '../../../helpers/storage';
import { connect } from 'react-redux';
import { CHANGE_CONTACT } from '../../../constants/actionReduct';
import CardPersonal from './card_personal';


class CardContacts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyValue: '',
            accounts: [],
            contactId: '',
            typeSearch: 'Friends'
        }

    }
    async componentWillMount() {
        await this.getChannels();
    }
    async getChannels() {
        const obj = { _id: Storage.getAccount()._id, keyValue: this.state.keyValue }
        await mainService.getChannels(obj).then(res => {
            if (res.status === 200) {
                this.setState({ accounts: res.data });
            }
        },
            err => {
                if (err?.response?.data) {
                }
            }
        );
    }
    async getAccount() {
        const obj = { keyValue: this.state.keyValue, exceptId: Storage.getAccount()._id }
        await mainService.findAccount(obj).then(res => {
            if (res.status === 200)
                this.setState({ accounts: res.data });
        },
            err => {
                if (err.response.data) {
                }
            }
        );
    }
    async search(e) {
        await this.setState({ keyValue: e.target.value });
        if (!this.state.keyValue)
            this.setState({ typeSearch: 'Friends' });
        if (this.state.keyValue && this.state.typeSearch === 'People') {
            await this.getAccount()
        } else
            await this.getChannels();
    }
    async clearSearch(e) {
        await this.setState({ keyValue: '', typeSearch: 'Friends' });
        await this.getChannels();
    }
    selectContact(e, item, i) {
        const contactId = item._id || item.account_id;
        this.setState({ contactId });
        this.props.changContactDispatch(CHANGE_CONTACT, item);
    }
    async changeSearch(e, type) {
        e.preventDefault();
        await this.setState({ typeSearch: type });
        if (type === 'People') {
            await this.getAccount()
        } else
            await this.getChannels();
    }
    _renderContact = () => {
        const { accounts } = this.state;
        let resuft = accounts.length === 0 ? <li></li> : accounts.map((e, i) =>
            <li className={'contact_Li ' + (this.state.contactId === (e._id || e.account_id) ? 'active' : '')} key={i}
                onClick={(event) => this.selectContact(event, e, i)}>
                <div className="d-flex bd-highlight">
                    <div className="img_cont">
                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" />
                        {!e.isGroup && <span className={e.isOnline ? 'online_icon' : 'away_icon'} />}
                    </div>
                    <div className="user_info">
                        <span>{e.account_name || e.name}</span>
                        <p>{e?.messages && e?.messages[e?.messages?.length - 1]?.message}</p>
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
                    {
                        this.state.keyValue &&
                        <div className="btn-group btn-group-justified btn-block btn-group-sm">
                            <a href="#" className={'btn btn-primary btnTypeSearch ' + (this.state.typeSearch === 'Friends' ? 'btnTypeSearchActive' : '')} onClick={(e) => this.changeSearch(e, 'Friends')}>Friends</a>
                            <a href="#" className={'btn btn-primary btnTypeSearch ' + (this.state.typeSearch === 'People' ? 'btnTypeSearchActive' : '')} onClick={(e) => this.changeSearch(e, 'People')}>People</a>
                        </div>
                    }

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
