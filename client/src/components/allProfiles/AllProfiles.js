import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileCard from './ProfileCard';
import { getProfiles } from '../../redux/actions/profileActions';

class Profiles extends Component {

    componentDidMount() {
        this.props.getProfiles();
    }


    render() {
        const { profiles, loading } = this.props.profile;
        let profileCards;

        if (profiles === null || loading) {
            profileCards = <Spinner />;
        } else {
            if (profiles.length > 0) {
                profileCards = profiles.map(profile => (
                    <ProfileCard key={profile._id} profile={profile} />
                ));
            } else {
                profileCards = <h4>No profiles found...</h4>;
            }
        }

        return (
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Developer Profiles</h1>
                            <p className="lead text-center">
                                Browse and connect with developers
              </p>
                            {profileCards}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
