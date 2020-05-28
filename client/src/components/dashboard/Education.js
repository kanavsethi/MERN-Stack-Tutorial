import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { deleteEducation } from '../../redux/actions/profileActions';



class Education extends Component {

    deleteThisEducation(educationId) {
        this.props.deleteEducation(educationId);
    }

    render() {

        let educations = this.props.educations.map(education => (
            <tr key={education._id}>
                <td>{education.school}</td>
                <td>{education.degree}</td>
                <td><Moment format='DD/MM/YYYY'>{education.from}</Moment></td>
                <td>{!education.current ? (<Moment format='DD/MM/YYYY'>{education.to}</Moment>) : 'Now'}</td>
                <td><button onClick={this.deleteThisEducation.bind(this, education._id)} className="btn btn-danger">Delete</button></td>
            </tr>

        ));


        return (
            <div>
                <h4 className="mb-4">Your Educations</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>From</th>
                            <th>To</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {educations}
                    </tbody>
                </table>
            </div >
        )
    }
}


Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}



export default connect(null, { deleteEducation })(Education);