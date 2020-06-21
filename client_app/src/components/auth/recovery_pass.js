import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ERR_REQUIED, ERR_FORMATEMAIL, ERR_COMFIRMPASS, ERR_FORMATPASS, ERR_FORMATPHONE }
    from '../../constants/commonConstant';
import authService from '../../uitls/auth_service';
import AlertPanel from '../../share/alert_panel';
class RecoveryPass extends Component {
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
    async recovery(e) {
        e.preventDefault();
        if (this.handleValidation()) {
            let { fields } = this.state;
            await authService.forgetPassword(fields).then(res => {
                if (res.status === 200) {
                    let { messAPI } = this.state;
                    messAPI['type'] = 'success';
                    messAPI['message'] = `${fields.email} already recovery.`;
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
                                <div className="col-lg-5">
                                    <div className="card card-auth shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header-auth"><h3 className="text-center font-weight-light my-4">Password Recovery</h3></div>
                                        <div className="card-body-auth">
                                            {/* <div className="small mb-3 text-muted">Enter your email address and we will send you a link to reset your password.</div> */}
                                            <form>
                                                <AlertPanel data={this.state.messAPI} clearProp={() => { this.setState({ messAPI: {} }) }} />

                                                <div className="form-group"><label className="small mb-1" htmlFor="ipEmail">Email</label>
                                                    <input className="form-control py-4" id="ipEmail" type="email" aria-describedby="emailHelp" placeholder="Enter email address"
                                                        onChange={this.handleChange.bind(this, "email")} />
                                                    <span className="col-md-offset-2 error" >{this.state.errors["email"]}</span>
                                                </div>
                                                <div className="form-group"><label className="small mb-1" htmlFor="ipPassword">Password</label>
                                                    <input className="form-control py-4" id="ipPassword" type="password" placeholder="Enter password"
                                                        onChange={this.handleChange.bind(this, "password")} />
                                                    <span className="col-md-offset-2 error" >{this.state.errors["password"]}</span>
                                                </div>
                                                <div className="form-group"><label className="small mb-1" htmlFor="ipConfirmPassword">Confirm Password</label>
                                                    <input className="form-control py-4" id="ipConfirmPassword" type="password" placeholder="Confirm password"
                                                        onChange={this.handleChange.bind(this, "cfPassword")} />
                                                    <span className="col-md-offset-2 error" >{this.state.errors["cfPassword"]}</span>
                                                </div>
                                                <div className="form-group d-flex d-flex-auth align-items-center justify-content-between mt-4 mb-0">
                                                    <Link to="/login" className="small">
                                                        Return to login
                                                    </Link>
                                                    <button className="btn btn-primary" onClick={(e) => this.recovery(e)}>Reset Password</button></div>
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

export default connect(mapStateToProps, mapPropsToDispatch)(RecoveryPass);