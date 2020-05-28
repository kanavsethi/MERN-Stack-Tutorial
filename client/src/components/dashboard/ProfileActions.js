import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import { faUserEdit, faGraduationCap, faCertificate } from '@fortawesome/free-solid-svg-icons';

export default function ProfileActions() {
    return (
        <div className="btn-group mb-4" role="group">
            <Link to="/editProfile" className="btn btn-light">
                <FontAwesomeIcon icon={faUserEdit} /> Edit Profile</Link>
            <Link to="/addExperience" className="btn btn-light">
                <FontAwesomeIcon icon={faCertificate} />
              Add Experience</Link>
            <Link to="/addEducation" className="btn btn-light">
                <FontAwesomeIcon icon={faGraduationCap} />
              Add Education</Link>
        </div>
    );
}
