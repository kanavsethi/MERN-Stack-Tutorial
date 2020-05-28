import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ProfileActions from './ProfileActions';
import { getCurrentProfile, deleteCurrentAccount } from '../../redux/actions/profileActions';
import Spinner from '../common/Spinner';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {


    componentDidMount() {
        this.props.getCurrentProfile();
    }



    render() {
        let { user } = this.props.auth;
        let { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner />;
        }
        else {
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome <Link to='/profile'>{user.name}</Link></p >
                        <ProfileActions />
                        <Experience experiences={profile.experience} />
                        <Education educations={profile.education} />
                        <div style={{ marginBottom: '60px' }}>
                            <button onClick={this.props.deleteCurrentAccount} className="btn btn-danger">Delete My Account</button>
                        </div>
                    </div >

                );
            }
            else {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You do not have a profile setup. Please create your profile</p>
                        <Link to='/createProfile' className='btn btn-lg btn-info'>Create Profile</Link>
                    </div>
                );
            }
        }

        return (
            <div className='dashboard'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">
                                Dashboard
                            </h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {

    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired

}

let mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});



export default connect(mapStateToProps, { getCurrentProfile, deleteCurrentAccount })(Dashboard);
