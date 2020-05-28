import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logOutUser } from "../../redux/actions/authActions";
import { clearCurrentProfile } from "../../redux/actions/profileActions";


class Navbar extends Component {
    logOutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logOutUser();
    }

    render() {

        let { isAuthenticated, user } = this.props.auth;

        let authenticatedBar = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard"><img src={user.avatar} alt={user.name} className='rounded-cirle' style={{ width: '25px', marginRight: '5px' }} />Hi {user.name}</Link>
                </li>
                <li className="nav-item">
                    {/* eslint-disable-next-line*/}
                    <a href='#' className='nav-link' onClick={this.logOutClick.bind(this)}>Logout</a>
                </li>
            </ul>
        );

        let guestBar = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Developer Social Network
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profiles">All Developers</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/feed">Post Feed</Link>
                            </li>
                        </ul>
                        {isAuthenticated ? authenticatedBar : guestBar}

                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logOutUser: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logOutUser, clearCurrentProfile })(Navbar);
