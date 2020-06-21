import React, { Component } from 'react';

class AlertPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: props.data.status,
            message: props.data.message,
            type: props.data.type,
        }

    }
    async componentWillReceiveProps(newprops) {
        await this.setState({
            status: newprops.data.status,
            message: newprops.data.message,
            type: newprops.data.type,
        });
        if (this.state.message) {
            setTimeout(() => {
                this.props.clearProp();
            }, 2000)
        }
    }
    renderPanel() {
        return (
            <div className={this.state.type ? `alert alert-` + this.state.type : ''}>
                {this.state.type && <strong>{this.state.type}! </strong>} {this.state.message}
            </div>
        );
    }
    render() {
        return (
            <div>{
                this.state.message && this.renderPanel()
            }
            </div>
        );
    }
}
export default AlertPanel
