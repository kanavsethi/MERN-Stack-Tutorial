import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { deleteExperience } from '../../redux/actions/profileActions';


class Experience extends Component {

    deleteThisExperience(experienceId) {
        this.props.deleteExperience(experienceId);
    }
    render() {

        let experiences = this.props.experiences.map(experience => (
            <tr key={experience._id}>
                <td>{experience.company}</td>
                <td>{experience.title}</td>
                <td><Moment format='DD/MM/YYYY'>{experience.from}</Moment></td>
                <td>{!experience.current ? (<Moment format='DD/MM/YYYY'>{experience.to}</Moment>) : 'Now'}</td>
                <td><button onClick={this.deleteThisExperience.bind(this, experience._id)} className="btn btn-danger">Delete</button></td>
            </tr>

        ));


        return (
            <div>
                <h4 className="mb-4">Your Experiences</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>From</th>
                            <th>To</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {experiences}
                    </tbody>
                </table>
            </div >
        )
    }
}


Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}



export default connect(null, { deleteExperience })(Experience);