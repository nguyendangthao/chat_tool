import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ERR_REQUIED, ERR_FORMATEMAIL } from '../../constants/commonConstant';
import authService from '../../uitls/auth_service';
import Http from '../../helpers/http';
import storage from '../../helpers/storage';
import AlertPanel from '../../share/alert_panel';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: {},
            errors: {},
            messAPI: {}
        }
    }

    componentWillMount() {
        if (storage.isLoggednIn()) {
            // this.props.history.push('/')
        }
    }
    handleValidation(field = '') {
        let { fields, errors } = this.state;
        errors[field] = '';
        if (field === 'email' || !field) {
            if (!fields['email']) {
                errors['email'] = ERR_REQUIED;
            } else {
                const pattern = /[a-zA-Z0-9]+[/\.]?([a-zA-Z0-9]+)?[/\@][a-z]{3,9}[/\.][a-z]{2,5}/g;
                const result = pattern.test(fields['email']);
                if (!result) {
                    errors['email'] = ERR_FORMATEMAIL;
                }
            }
        }
        if (field === 'password' || !field) {
            if (!fields['password']) {
                errors['password'] = ERR_REQUIED;
            }
        }
        this.setState({ errors });
        return Object.values(errors).every(x => !x);
    }
    handleChange(field, e) {
        let { fields } = this.state;
        fields[field] = e.target.value;
        this.setState({ fields });
        this.handleValidation(field);
    }
    async login(e) {
        e.preventDefault();
        if (this.handleValidation()) {
            let { fields } = this.state;
            // let data = await authService.login(fields);  // one in two away get data
            await authService.login(fields).then(res => {
                const { token, account } = res.data;
                new Http().setAuthorizationHeader(token);
                storage.setToken(token);
                storage.setAccount(account);
                this.props.history.push('/')
            },
                err => {
                    if (err.response.data) {
                        let { messAPI } = this.state;
                        messAPI['type'] = 'warning';
                        messAPI['message'] = err.response.data.message;
                        this.setState({ messAPI });
                    }
                }
            );
        }
    }
    render() {
        return (
            <div className="bg-primary" id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center justify-content">
                                <div className="col-lg-5">
                                    <div className="card card-auth shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header-auth"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                        <div className="card-body-auth">
                                            <form >
                                                <AlertPanel data={this.state.messAPI} clearProp={() => { this.setState({ messAPI: {} }) }} />

                                                <div className="form-group">
                                                    <label className="small mb-1" htmlFor="ipEmail">Email</label>
                                                    <input className="form-control py-4" id="ipEmail" type="email" placeholder="Enter email address"
                                                        onChange={this.handleChange.bind(this, "email")} />
                                                    <span className="col-md-offset-2 error" >{this.state.errors["email"]}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="small mb-1" htmlFor="ipPassword">Password</label>
                                                    <input className="form-control py-4" id="ipPassword" type="password" placeholder="Enter password"
                                                        onChange={this.handleChange.bind(this, "password")} />
                                                    <span className="col-md-offset-2 error" >{this.state.errors["password"]}</span>
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox"><input className="custom-control-input" id="cbRememberPass" type="checkbox" />
                                                        <label className="custom-control-label" htmlFor="cbRememberPass">Remember password</label>
                                                    </div>
                                                </div>
                                                <div className="form-group d-flex d-flex-auth align-items-center justify-content-between mt-4 mb-0">
                                                    <Link to="/recovery" className="small">
                                                        Forgot Password?
                                                    </Link>
                                                    <button className="btn btn-primary" onClick={(e) => this.login(e)}>
                                                        Login
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer-auth text-center">
                                            <Link to="/register" className="small">
                                                Need an account? Sign up!
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        colorSelect: state.drawReduct.colorSelect,
    };
}
const mapPropsToDispatch = dispatch => ({
    changeColorDispatch: (action, data) => {
        return dispatch({
            type: action,
            colorSelect: data
        });
    },
});

export default connect(mapStateToProps, mapPropsToDispatch)(Login);