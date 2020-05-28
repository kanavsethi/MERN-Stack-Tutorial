import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from "prop-types";

import { loginUser } from '../../redux/actions/authActions';
import TextInputFieldGroup from '../Input/TextInputFieldGroup';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        let userData = (({ email, password }) => ({ email, password }))(this.state);
        this.props.loginUser(userData);
    }


    static getDerivedStateFromProps(props, state) {
        if (props.auth.isAuthenticated) {
            props.history.push('/dashboard');
        }
        return state;

    }

    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextInputFieldGroup
                                    type="email"
                                    error={this.props.errors.email}
                                    placeholder="Email Address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                <TextInputFieldGroup
                                    type="password"
                                    error={this.props.errors.password}
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                <input type="submit" value='Login' className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps, { loginUser })(Login);