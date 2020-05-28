import React, { Component } from 'react'
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";

import { registerUser } from "../../redux/actions/authActions";
import TextInputFieldGroup from '../Input/TextInputFieldGroup'

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
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
        let newUser = (({ name, email, password, password2 }) => ({ name, email, password, password2 }))(this.state);

        this.props.registerUser(newUser, this.props.history);
    }


    static getDerivedStateFromProps(props, state) {
        if (props.auth.isAuthenticated) {
            props.history.push('/dashboard');
        }
        return state;

    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form noValidate onSubmit={this.onSubmit}>

                                <TextInputFieldGroup
                                    type="text"
                                    error={this.props.errors.name}
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange} />

                                <TextInputFieldGroup
                                    type="email"
                                    error={this.props.errors.email}
                                    placeholder="Email Address"
                                    name="email"
                                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
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

                                <TextInputFieldGroup
                                    type="password"
                                    error={this.props.errors.password2}
                                    placeholder="Confirm Password"
                                    name="password2"
                                    value={this.state.password2}
                                    onChange={this.onChange} />

                                <input type="submit" value='Sign Up' className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));