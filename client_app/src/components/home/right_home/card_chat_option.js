import React, { Component } from 'react';

class CardChatOption extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyValue: '',
            accouts: [],
            contactId: ''
        }
    }
    openOption(e) {
        e.preventDefault();
    }
    render() {
        return (
            <div >
                <span id="action_menu_btn" onClick={e => this.openOption(e)}><i className="fas fa-ellipsis-v" /></span>
                {/* <div className="action_menu">
                    <ul>
                        <li><i className="fas fa-user-circle" /> View profile</li>
                        <li><i className="fas fa-users" /> Add to close friends</li>
                        <li><i className="fas fa-plus" /> Add to group</li>
                        <li><i className="fas fa-ban" /> Block</li>
                        <li><i className="fas fa-sign-out-alt" /> Logout</li>
                    </ul>
                </div> */}
            </div>
        );
    }
}
export default CardChatOption
