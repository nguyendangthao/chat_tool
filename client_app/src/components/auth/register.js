import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ERR_REQUIED, ERR_FORMATEMAIL, ERR_COMFIRMPASS, ERR_FORMATPASS, ERR_FORMATPHONE }
    from '../../constants/commonConstant';
import authService from '../../uitls/auth_service';
import AlertPanel from '../../share/alert_panel';
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: {},
            errors: {},
            messAPI: {}
        }
    }
    componentWillMount() {
    }
    handleValidation(field = '') {
        let { fields, errors } = this.state;
        errors[field] = '';
        if (field === 'account_name' || !field) {
            if (!fields['account_name']) {
                errors['account_name'] = ERR_REQUIED;
            }
        }
        if (field === 'phone_number' || !field) {
            if (!fields['phone_number']) {
                errors['phone_number'] = ERR_REQUIED;
            } else {
                const pattern = /^\(?\+?[0-9]{1,3}\)? ?-?[0-9]{1,3}? ?-?[0-9]{3,5}? ?-?[0-9]{4}?$/;
                const result = pattern.test(fields['phone_number']);
                if (!result) {
                    errors['phone_number'] = ERR_FORMATPHONE;
                }
            }
        }
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
            } else {
                // Minimum eight characters, at least one letter, one number and one special character:
                // const pattern = new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$");
                // const result = pattern.test(fields['password']);
                // if (!result) {
                //     errors['password'] = ERR_FORMATPASS;
                // }
            }
        }
        if (field === 'cfPassword' || !field) {
            if (!fields['cfPassword']) {
                errors['cfPassword'] = ERR_REQUIED;
            } else {
                if (fields['password'] !== fields['cfPassword'])
                    errors['cfPassword'] = ERR_COMFIRMPASS;
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
    async create(e) {
        e.preventDefault();
        if (this.handleValidation()) {
            let { fields } = this.state;
            await authService.create(fields).then(res => {
                if (res.status === 200) {
                    let { messAPI } = this.state;
                    messAPI['type'] = 'success';
                    messAPI['message'] = `${fields.email} already created.`;
                    this.setState({ messAPI });
                }

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
                                <div className="col-lg-7">
                                    <div className="card card-auth shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header-auth"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                                        <div className="card-body-auth">
                                            <form>
                                                <AlertPanel data={this.state.messAPI} clearProp={() => { this.setState({ messAPI: {} }) }} />
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group"><label className="small mb-1" htmlFor="ipAccount">Account Name</label>
                                                            <input className="form-control py-4" id="ipAccount" type="text" placeholder="Enter account name"
                                                                onChange={this.handleChange.bind(this, "account_name")} />
                                                            <span className="col-md-offset-2 error" >{this.state.errors["account_name"]}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group"><label className="small mb-1" htmlFor="ipPhone">Phone</label>
                                                            <input className="form-control py-4" id="ipPhone" type="text" placeholder="Enter phone"
                                                                onChange={this.handleChange.bind(this, "phone_number")} />
                                                            <span className="col-md-offset-2 error" >{this.state.errors["phone_number"]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group"><label className="small mb-1" htmlFor="ipEmail">Email</label>
                                                    <input className="form-control py-4" id="ipEmail" type="email" aria-describedby="emailHelp" placeholder="Enter email address"
                                                        onChange={this.handleChange.bind(this, "email")} />
                                                    <span className="col-md-offset-2 error" >{this.state.errors["email"]}</span>
                                                </div>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group"><label className="small mb-1" htmlFor="ipPassword">Password</label>
                                                            <input className="form-control py-4" id="ipPassword" type="password" placeholder="Enter password"
                                                                onChange={this.handleChange.bind(this, "password")} />
                                                            <span className="col-md-offset-2 error" >{this.state.errors["password"]}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group"><label className="small mb-1" htmlFor="ipConfirmPassword">Confirm Password</label>
                                                            <input className="form-control py-4" id="ipConfirmPassword" type="password" placeholder="Confirm password"
                                                                onChange={this.handleChange.bind(this, "cfPassword")} />
                                                            <span className="col-md-offset-2 error" >{this.state.errors["cfPassword"]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group mt-4 mb-0">
                                                    <button className="btn btn-primary btn-block" onClick={(e) => this.create(e)}>
                                                        Create Account
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer-auth text-center">
                                            <Link to="/login" className="small">
                                                Have an account? Go to login
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

export default connect(mapStateToProps, mapPropsToDispatch)(Register);