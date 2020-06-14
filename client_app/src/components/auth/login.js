import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props)
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
                                            <form>
                                                <div className="form-group">
                                                    <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>
                                                    <input className="form-control py-4" id="inputEmailAddress" type="email" placeholder="Enter email address" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="small mb-1" htmlFor="inputPassword">Password</label>
                                                    <input className="form-control py-4" id="inputPassword" type="password" placeholder="Enter password" />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox"><input className="custom-control-input" id="rememberPasswordCheck" type="checkbox" />
                                                        <label className="custom-control-label" htmlFor="rememberPasswordCheck">Remember password</label>
                                                    </div>
                                                </div>
                                                <div className="form-group d-flex d-flex-auth align-items-center justify-content-between mt-4 mb-0">
                                                    <Link to="/recovery" className="small">
                                                        Forgot Password?
                                                    </Link>
                                                    <a className="btn btn-primary" href="index.html">Login</a>
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